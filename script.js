// ========================
// BANCO DE DADOS
// ========================
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

// ========================
// PROCESSAMENTO
// ========================
const ELEMENTS_DB = {};
rawElements.trim().split('\n').forEach(line => {
    const [name, emoji] = line.trim().split(/\s+/);
    ELEMENTS_DB[name] = emoji;
});

const RECIPES = {};
rawRecipes.trim().split('\n').forEach(line => {
    const [ing, res] = line.split('=').map(s => s.trim());
    RECIPES[ing] = res;
});

// ========================
// ESTADO + SAVE
// ========================
const baseElements = ["Água", "Fogo", "Terra", "Ar"];
let inventory = JSON.parse(localStorage.getItem("inventory")) || [...baseElements];

function save() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// ========================
const canvas = document.getElementById('canvas');
const inventoryContainer = document.getElementById('inventory');
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');
const combineSound = document.getElementById('combine-sound');

// ========================
// 🔊 SOM SEGURO
// ========================
function playSound() {
    if (!combineSound) return;

    try {
        combineSound.currentTime = 0;
        combineSound.play().catch(() => {});
    } catch {}
}

// desbloqueio de áudio (mobile)
document.addEventListener("click", () => {
    if (!combineSound) return;

    combineSound.play().then(() => {
        combineSound.pause();
        combineSound.currentTime = 0;
    }).catch(() => {});
}, { once: true });

// ========================
// CRIAR ELEMENTO
// ========================
function createElement(name, isCanvas = false) {
    const div = document.createElement('div');
    div.className = isCanvas ? 'element canvas-item' : 'element';
    div.dataset.name = name;

    const emoji = ELEMENTS_DB[name] || "✨";
    div.innerHTML = `<span>${emoji}</span> ${name}`;

    // =========================
    // DRAG PC
    // =========================
    div.draggable = true;
    div.ondragstart = e => {
        e.dataTransfer.setData("name", name);
        if (isCanvas) e.dataTransfer.setData("id", div.id);
    };

    // =========================
    // TOUCH MOBILE (CORRIGIDO)
    // =========================
    let clone = null;

    div.ontouchstart = e => {
        const touch = e.touches[0];

        if (!isCanvas) {
            clone = createElement(name, true);
            canvas.appendChild(clone);
        } else {
            clone = div;
        }

        clone.style.position = "absolute";
        clone.style.left = (touch.clientX - 50) + "px";
        clone.style.top = (touch.clientY - 20) + "px";
    };

    div.ontouchmove = e => {
        if (!clone) return;

        const touch = e.touches[0];
        clone.style.left = (touch.clientX - 50) + "px";
        clone.style.top = (touch.clientY - 20) + "px";
    };

    div.ontouchend = () => {
        if (clone) {
            checkCollision(clone);
            clone = null;
        }
    };

    if (isCanvas) {
        div.id = "el-" + Math.random().toString(36).slice(2);
    }

    return div;
}

// ========================
// INVENTÁRIO
// ========================
function renderInventory(newItem = null) {
    inventoryContainer.innerHTML = "";

    inventory.forEach(name => {
        const el = createElement(name);

        if (name === newItem) {
            el.classList.add("new-discovery");
        }

        inventoryContainer.appendChild(el);
    });
}

// ========================
// DROP PC
// ========================
function handleDrop(e) {
    e.preventDefault();

    const name = e.dataTransfer.getData("name");
    const id = e.dataTransfer.getData("id");

    const rect = canvas.getBoundingClientRect();

    let el;

    if (id && document.getElementById(id)) {
        el = document.getElementById(id);
    } else {
        el = createElement(name, true);
        canvas.appendChild(el);
    }

    el.style.left = (e.clientX - rect.left - 50) + "px";
    el.style.top = (e.clientY - rect.top - 20) + "px";

    checkCollision(el);
}

// ========================
// PARTÍCULAS
// ========================
function spawnParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");

        p.style.position = "absolute";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.width = "6px";
        p.style.height = "6px";
        p.style.background = "white";
        p.style.borderRadius = "50%";
        p.style.pointerEvents = "none";

        canvas.appendChild(p);

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 60;

        p.animate([
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${Math.cos(angle)*speed}px, ${Math.sin(angle)*speed}px)`, opacity: 0 }
        ], { duration: 500 });

        setTimeout(() => p.remove(), 500);
    }
}

// ========================
// IA INFINITA
// ========================
function generateElement(n1, n2) {
    return (
        RECIPES[`${n1} + ${n2}`] ||
        RECIPES[`${n2} + ${n1}`] ||
        `${n1}-${n2}`
    );
}

// ========================
// COLISÃO (ANTI BUG)
// ========================
let isCombining = false;

function checkCollision(movedEl) {
    if (isCombining) return;

    const items = document.querySelectorAll('.canvas-item');
    const rect1 = movedEl.getBoundingClientRect();

    items.forEach(target => {
        if (target === movedEl || isCombining) return;

        const rect2 = target.getBoundingClientRect();

        const collision = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );

        if (!collision) return;

        isCombining = true;

        const n1 = movedEl.dataset.name;
        const n2 = target.dataset.name;

        const result = generateElement(n1, n2);

        playSound();

        const x = target.style.left;
        const y = target.style.top;

        spawnParticles(parseInt(x), parseInt(y));

        movedEl.remove();
        target.remove();

        const newEl = createElement(result, true);
        newEl.style.left = x;
        newEl.style.top = y;

        canvas.appendChild(newEl);

        if (!inventory.includes(result)) {
            inventory.push(result);
            renderInventory(result);
            save();
        }

        setTimeout(() => isCombining = false, 50);
    });
}

// ========================
// INIT
// ========================
function init() {
    renderInventory();

    canvas.ondragover = e => e.preventDefault();
    canvas.ondrop = handleDrop;

    clearBtn.onclick = () => {
        document.querySelectorAll('.canvas-item').forEach(e => e.remove());
    };
}

function init() {
    renderInventory();

    canvas.ondragover = e => e.preventDefault();
    canvas.ondrop = handleDrop;

    clearBtn.onclick = () => {
        document.querySelectorAll('.canvas-item').forEach(e => e.remove());
    };

    // ✅ RESET CORRETO
    resetBtn.onclick = () => {
        const confirmReset = confirm("⚠️ Tem certeza que quer apagar TODO o progresso?");

        if (!confirmReset) return;

        // reset inventário
        inventory = [...baseElements];

        // limpar save
        localStorage.removeItem("inventory");

        // limpar tela
        document.querySelectorAll('.canvas-item').forEach(e => e.remove());

        // atualizar interface
        renderInventory();

        // feedback opcional
        console.log("Progresso resetado!");
    };
}

init();