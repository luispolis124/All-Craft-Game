// 1. LISTA DE ELEMENTOS (Basta escrever: Nome Emoji)
const rawElements = `
    Água 💧
    Fogo 🔥
    Terra 🌱
    Ar 💨
    Lama 💩
    Lava 🌋
    Vapor ☁️
    Pedra 🪨
    Energia ⚡
    Chuva 🌧️
    Planta 🌿
    Metal ⛓️
    Areia 🏖️
    Vidro 🍷
    Nuvem ☁️
    Vento 🌬️
    Pântano 🐊
    Vida 🧬
    Humano 👤
    Bactéria 🦠
    Eletricidade 🔌
    Ferramenta 🔨
    Floresta 🌳
`;

// 2. LISTA DE RECEITAS (Basta escrever: Item1 + Item2 = Resultado)
const rawRecipes = `
    Água + Terra = Lama
    Fogo + Terra = Lava
    Fogo + Ar = Energia
    Ar + Água = Chuva
    Lava + Água = Pedra
    Ar + Nuvem = Vento
    Pedra + Ar = Areia
    Fogo + Areia = Vidro
    Lama + Água = Pântano
    Terra + Chuva = Planta
    Pântano + Energia = Vida
    Vida + Água = Bactéria
    Vida + Terra = Humano
    Humano + Energia = Eletricidade
    Humano + Metal = Ferramenta
    Humano + Pedra = Ferramenta
    Planta + Terra = Floresta
`;

// --- PROCESSAMENTO DOS DADOS (Não precisa mexer aqui) ---
const ELEMENTS_DB = {};
rawElements.trim().split('\n').forEach(line => {
    const [name, emoji] = line.trim().split(/\s+/);
    if (name && emoji) ELEMENTS_DB[name] = emoji;
});

const RECIPES = {};
rawRecipes.trim().split('\n').forEach(line => {
    const [ingredients, result] = line.split('=').map(s => s.trim());
    if (ingredients && result) RECIPES[ingredients] = result;
});

// --- LÓGICA DO JOGO ---
let inventory = ["Água", "Fogo", "Terra", "Ar"];

const canvas = document.getElementById('canvas');
const inventoryContainer = document.getElementById('inventory');
const clearBtn = document.getElementById('clear-btn');
const combineSound = document.getElementById('combine-sound');

function init() {
    renderInventory();
    canvas.ondragover = (e) => e.preventDefault();
    canvas.ondrop = handleDrop;
    clearBtn.onclick = () => canvas.querySelectorAll('.canvas-item').forEach(el => el.remove());
}

function createVisualElement(name, isCanvas = false) {
    const div = document.createElement('div');
    div.className = isCanvas ? 'element canvas-item' : 'element';
    // Pega o emoji do banco processado ou usa estrela se não achar
    const emoji = ELEMENTS_DB[name] || "✨";
    div.innerHTML = `<span>${emoji}</span> ${name}`;
    div.draggable = true;

    if (isCanvas) {
        div.id = "el-" + Math.random().toString(36).substr(2, 9);
    }

    div.ondragstart = (e) => {
        e.dataTransfer.setData("text/name", name);
        if (isCanvas) e.dataTransfer.setData("text/id", div.id);
    };

    return div;
}

function renderInventory(newElementName = null) {
    inventoryContainer.innerHTML = '';
    inventory.forEach(name => {
        const el = createVisualElement(name);
        if (name === newElementName) {
            el.classList.add('new-discovery');
        }
        inventoryContainer.appendChild(el);
    });
}

function handleDrop(e) {
    e.preventDefault();
    const name = e.dataTransfer.getData("text/name");
    const id = e.dataTransfer.getData("text/id");
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let el;
    if (id && document.getElementById(id)) {
        el = document.getElementById(id);
    } else {
        el = createVisualElement(name, true);
        canvas.appendChild(el);
    }

    el.style.left = `${x - 50}px`;
    el.style.top = `${y - 20}px`;

    checkCollision(el);
}

function checkCollision(movedEl) {
    const items = canvas.querySelectorAll('.canvas-item');
    const movedRect = movedEl.getBoundingClientRect();

    items.forEach(target => {
        if (target === movedEl) return;

        const targetRect = target.getBoundingClientRect();
        const collision = !(movedRect.right < targetRect.left || 
                            movedRect.left > targetRect.right || 
                            movedRect.bottom < targetRect.top || 
                            movedRect.top > targetRect.bottom);

        if (collision) {
            // Extrai o nome do elemento limpando o emoji e espaços
            const name1 = movedEl.innerText.replace(ELEMENTS_DB[movedEl.innerText.split(' ').slice(1).join(' ')] || "", "").trim().split(' ').pop();
            // Forma mais segura de pegar o nome:
            const getName = (el) => el.innerText.split(' ').slice(1).join(' ').trim();
            
            const n1 = getName(movedEl);
            const n2 = getName(target);
            
            const result = RECIPES[`${n1} + ${n2}`] || RECIPES[`${n2} + ${n1}`];

            if (result) {
                if (combineSound) {
                    combineSound.currentTime = 0;
                    combineSound.play();
                }
                
                const posX = target.style.left;
                const posY = target.style.top;

                movedEl.remove();
                target.remove();

                const newEl = createVisualElement(result, true);
                newEl.style.left = posX;
                newEl.style.top = posY;
                canvas.appendChild(newEl);

                if (!inventory.includes(result)) {
                    inventory.push(result);
                    renderInventory(result);
                }
            }
        }
    });
}

init();