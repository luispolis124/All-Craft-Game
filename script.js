const ELEMENTS_DB = {
    "Água": "💧", "Fogo": "🔥", "Terra": "🌱", "Ar": "💨",
    "Lama": "💩", "Lava": "🌋", "Energia": "⚡", "Vapor": "☁️",
    "Pedra": "🪨", "Metal": "⛓️", "Montanha": "🏔️", "Chuva": "🌧️",
    "Planta": "🌿", "Vento": "🌬️", "Areia": "🏖️", "Vidro": "🍷"
};

const RECIPES = {
    "Água + Terra": "Lama",
    "Fogo + Terra": "Lava",
    "Fogo + Ar": "Energia",
    "Água + Fogo": "Vapor",
    "Lava + Água": "Pedra",
    "Terra + Terra": "Montanha",
    "Pedra + Fogo": "Metal",
    "Ar + Água": "Chuva",
    "Fogo + Areia": "Vidro",
    "Pedra + Ar": "Areia"
};

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
    div.innerHTML = `<span>${ELEMENTS_DB[name] || "✨"}</span> ${name}`;
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
            const name1 = movedEl.lastChild.textContent.trim();
            const name2 = target.lastChild.textContent.trim();
            
            const result = RECIPES[`${name1} + ${name2}`] || RECIPES[`${name2} + ${name1}`];

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