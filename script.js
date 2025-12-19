// ==========================================
// 1. CONFIGURAÇÕES E ESTADO INICIAL
// ==========================================
let currentLang = "pt"; 
let firstPick = null;
let basics = ["Fire", "Water", "Earth", "Air"];
let discovered = new Set();

// ==========================================
// 2. TRADUÇÕES (UI E ELEMENTOS)
// ==========================================
const translations = {
  "pt": {
    "title": "AllCraft", "tagline": "Combine elementos e descubra novos!", "discovered_header": "Descobertas", "reset_button": "🔁 Resetar Jogo", "alert_new": "✨ Nova descoberta:", "alert_not_found": "❌ Nenhuma combinação encontrada!", "confirm_reset": "Tem certeza que deseja resetar o jogo?",
    "Fire": "Fogo", "Water": "Água", "Earth": "Terra", "Air": "Ar", "Steam": "Vapor", "Lava": "Lava", "Energy": "Energia", "Mud": "Lama", "Cloud": "Nuvem", "Thunderstorm": "Tempestade", "Dust": "Poeira", "Clay": "Argila", "Ocean": "Oceano", "Plant": "Planta", "Smoke": "Fumaça", "Tornado": "Tornado", "Sand": "Areia", "Harmattan": "Harmattan", "Sandstorm": "Tempestade de Areia", "Tree": "Árvore", "Swamp": "Pântano", "Life": "Vida", "Bacteria": "Bactéria", "Seed": "Semente", "Brick": "Tijolo", "Wall": "Muro", "House": "Casa", "Wave": "Onda", "Metal": "Metal", "Tool": "Ferramenta", "Time": "Tempo", "Pressure": "Pressão", "Stone": "Pedra", "Bridge": "Ponte", "Farm": "Fazenda", "Field": "Campo", "Engine": "Motor", "Wheel": "Roda", "Car": "Carro", "Robot": "Robô", "Dinosaur": "Dinossauro", "Fossil": "Fóssil", "Oil": "Óleo", "Star": "Estrela", "Rocket": "Foguete", "Space": "Espaço", "Mountain": "Montanha", "Island": "Ilha", "Volcano": "Vulcão", "Eruption": "Erupção", "Forest": "Floresta", "Jungle": "Selva", "Windmill": "Moinho de Vento", "Electricity": "Eletricidade", "Light": "Luz", "Wind": "Vento", "Sun": "Sol", "Moon": "Lua", "Planet": "Planeta", "Dune": "Duna", "Eclipse": "Eclipse", "Pottery": "Olaria", "Surf": "Surf", "Geyser": "Gêiser", "Tea": "Chá", "Human": "Humano", "Adam": "Adão", "Eve": "Eva", "Glass": "Vidro", "Light Bulb": "Lâmpada", "Window": "Janela", "Aquarium": "Aquário", "Hourglass": "Ampulheta", "Fish": "Peixe", "Bottle": "Garrafa", "Hole": "Buraco", "Door": "Porta", "Cook": "Cozinhar", "Weapon": "Arma", "Cave": "Caverna", "Campfire": "Fogueira", "Train": "Trem", "Cotton": "Algodão", "Cloth": "Tecido", "Clothes": "Roupa", "Statue": "Estátua", "Color": "Tinta/Cor", "Painting": "Pintura", "Book": "Livro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autor", "Idea": "Ideia", "Copyright": "Direitos Autorais", "Work": "Obra", "Art": "Arte", "Museum": "Museu", "Public Domain": "Domínio Público", "Kitchen": "Cozinha", "Restaurant": "Restaurante", "Hotel": "Hotel", "Recipe": "Receita", "Chef": "Chef", "Camera": "Câmera", "Projector": "Projetor", "Film": "Filme/Cinema", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patente", "Creativity": "Criatividade", "God": "Deus", "Cain": "Caim", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cam", "Japheth": "Jafé", "Abraham": "Abraão", "Sarah": "Sara", "Isaac": "Isaque", "Ishmael": "Ismael", "Hagar": "Agar", "Lot": "Ló", "Infinite": "Infinito", "City": "Cidade", "Sacrifice": "Sacrifício", "Ark": "Arca", "Craft": "Criação", "Infinitecraft": "Infinite Craft", "All": "Tudo", "Allcraft": "All Craft", "Dragon": "Dragão", "Cat": "Gato", "Bird": "Pássaro", "Lion": "Leão", "Tiger": "Tigre", "King": "Rei", "Brazil": "Brasil", "Luis": "Luis (Criador)", "Leão Brasileiro de Luis": "Leão Brasileiro de Luis", "Quanshian": "Quanshian nermeacos", "Rebekah": "Rebeca", "Jacob": "Jacó", "Esau": "Esaú",
    "The Lion King": "O Rei Leão", 
    "The Lion King II: Simba's Pride": "O Rei Leão 2: O Reino de Simba", 
    "The Lion King 1½": "O Rei Leão 3: Hakuna Matata", 
    "The Lion Inside Me": "O Leão Dentro de Mim", 
    "The Lion Inside Me 2: The Prínciple of Akin": "O Leão Dentro de Mim 2: O Princípio de Akin", 
    "The Lion Inside Me 3: The Mystery of Akin": "O Leão Dentro de Mim 3: O Mistério de Akin"
  },
  "pt-pt": {
    "title": "AllCraft", "tagline": "Combina elementos e descobre novos!", "discovered_header": "Descobertas", "reset_button": "🔁 Reiniciar Jogo", "alert_new": "✨ Nova descoberta:", "alert_not_found": "❌ Nenhuma combinação encontrada!", "confirm_reset": "Tens a certeza que desejas reiniciar o jogo?",
    "Fire": "Fogo", "Water": "Água", "Earth": "Terra", "Air": "Ar", "Steam": "Vapor", "Lava": "Lava", "Energy": "Energia", "Mud": "Lama", "Cloud": "Nuvem", "Thunderstorm": "Tempestade", "Dust": "Poeira", "Clay": "Argila", "Ocean": "Oceano", "Plant": "Planta", "Smoke": "Fumo", "Tornado": "Tornado", "Sand": "Areia", "Tree": "Árvore", "Swamp": "Pântano", "Life": "Vida", "Bacteria": "Bactéria", "Seed": "Semente", "Brick": "Tijolo", "Wall": "Muro", "House": "Casa", "Wave": "Onda", "Metal": "Metal", "Tool": "Ferramenta", "Time": "Tempo", "Pressure": "Pressão", "Stone": "Pedra", "Bridge": "Ponte", "Farm": "Quinta", "Field": "Campo", "Engine": "Motor", "Wheel": "Roda", "Car": "Carro", "Robot": "Robô", "Dinosaur": "Dinossauro", "Fossil": "Fóssil", "Oil": "Óleo", "Star": "Estrela", "Rocket": "Foguete", "Space": "Espaço", "Mountain": "Montanha", "Island": "Ilha", "Volcano": "Vulcão", "Eruption": "Erupção", "Forest": "Floresta", "Jungle": "Selva", "Windmill": "Moinho de Vento", "Electricity": "Eletricidade", "Light": "Luz", "Wind": "Vento", "Sun": "Sol", "Moon": "Lua", "Planet": "Planeta", "Dune": "Duna", "Eclipse": "Eclipse", "Human": "Humano", "Adam": "Adão", "Eve": "Eva", "Glass": "Vidro", "Light Bulb": "Lâmpada", "Fish": "Peixe", "Bottle": "Garrafa", "Hole": "Buraco", "Door": "Porta", "Cook": "Cozinhar", "Weapon": "Arma", "Cave": "Caverna", "Campfire": "Fogueira", "Train": "Comboio", "Cotton": "Algodão", "Cloth": "Tecido", "Clothes": "Roupa", "Statue": "Estátua", "Color": "Cor", "Painting": "Pintura", "Book": "Livro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autor", "Idea": "Ideia", "Art": "Arte", "Museum": "Museu", "Kitchen": "Cozinha", "Restaurant": "Restaurante", "Hotel": "Hotel", "Recipe": "Receita", "Chef": "Chef", "Camera": "Câmara", "Projector": "Projetor", "Film": "Filme", "God": "Deus", "City": "Cidade", "Ark": "Arca", "Dragon": "Dragão", "Cat": "Gato", "Bird": "Pássaro", "Lion": "Leão", "Tiger": "Tigre", "King": "Rei", "Brazil": "Brasil",
    "The Lion King": "O Rei Leão",
    "The Lion King II: Simba's Pride": "O Rei Leão 2",
    "The Lion King 1½": "O Rei Leão 3",
    "The Lion Inside Me": "O Leão Dentro de Mim",
    "The Lion Inside Me 2: The Prínciple of Akin": "O Leão Dentro de Mim 2",
    "The Lion Inside Me 3: The Mystery of Akin": "O Leão Dentro de Mim 3"
  },
  "en": {
    "title": "AllCraft", "tagline": "Combine elements and discover new ones!", "discovered_header": "Discovered", "reset_button": "🔁 Reset Game", "alert_new": "✨ New discovery:", "alert_not_found": "❌ No combination found!", "confirm_reset": "Are you sure you want to reset the game?",
    "Fire": "Fire", "Water": "Water", "Earth": "Earth", "Air": "Air", "Steam": "Steam", "Lava": "Lava", "Energy": "Energy", "Mud": "Mud", "Cloud": "Cloud", "Thunderstorm": "Thunderstorm", "Dust": "Dust", "Clay": "Clay", "Ocean": "Ocean", "Plant": "Plant", "Smoke": "Smoke", "Tornado": "Tornado", "Sand": "Sand", "Harmattan": "Harmattan", "Sandstorm": "Sandstorm", "Tree": "Tree", "Swamp": "Swamp", "Life": "Life", "Bacteria": "Bacteria", "Seed": "Seed", "Brick": "Brick", "Wall": "Wall", "House": "House", "Wave": "Wave", "Metal": "Metal", "Tool": "Tool", "Time": "Time", "Pressure": "Pressure", "Stone": "Stone", "Bridge": "Bridge", "Farm": "Farm", "Field": "Field", "Engine": "Engine", "Wheel": "Wheel", "Car": "Car", "Robot": "Robot", "Dinosaur": "Dinosaur", "Fossil": "Fossil", "Oil": "Oil", "Star": "Star", "Rocket": "Rocket", "Space": "Space", "Mountain": "Mountain", "Island": "Island", "Volcano": "Volcano", "Eruption": "Eruption", "Forest": "Forest", "Jungle": "Jungle", "Windmill": "Windmill", "Electricity": "Electricity", "Light": "Light", "Wind": "Wind", "Sun": "Sun", "Moon": "Moon", "Planet": "Planet", "Dune": "Dune", "Eclipse": "Eclipse", "Pottery": "Pottery", "Surf": "Surf", "Geyser": "Geyser", "Tea": "Tea", "Human": "Human", "Adam": "Adam", "Eve": "Eve", "Glass": "Glass", "Light Bulb": "Light Bulb", "Window": "Window", "Aquarium": "Aquarium", "Hourglass": "Hourglass", "Fish": "Fish", "Bottle": "Bottle", "Hole": "Hole", "Door": "Door", "Cook": "Cook", "Weapon": "Weapon", "Cave": "Cave", "Campfire": "Campfire", "Train": "Train", "Cotton": "Cotton", "Cloth": "Cloth", "Clothes": "Clothes", "Statue": "Statue", "Color": "Color/Paint", "Painting": "Painting", "Book": "Book", "Library": "Library", "Comet": "Comet", "Author": "Author", "Idea": "Idea", "Copyright": "Copyright", "Work": "Work (Creation)", "Art": "Art", "Museum": "Museum", "Public Domain": "Public Domain", "Kitchen": "Kitchen", "Restaurant": "Restaurant", "Hotel": "Hotel", "Recipe": "Recipe", "Chef": "Chef", "Camera": "Camera", "Projector": "Projector", "Film": "Film/Cinema", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patent", "Creativity": "Creativity", "God": "God", "Cain": "Cain", "Abel": "Abel", "Noah": "Noah", "Shem": "Shem", "Ham": "Ham", "Japheth": "Japheth", "Abraham": "Abraham", "Sarah": "Sarah", "Isaac": "Isaac", "Ishmael": "Ishmael", "Hagar": "Hagar", "Lot": "Lot", "Infinite": "Infinite", "City": "City", "Sacrifice": "Sacrifice", "Ark": "Ark", "Craft": "Craft", "Infinitecraft": "Infinite Craft", "All": "All", "Allcraft": "All Craft", "Dragon": "Dragon", "Cat": "Cat", "Bird": "Bird", "Lion": "Lion", "Tiger": "Tiger", "King": "King", "Brazil": "Brazil", "Luis": "Luis (Creator)", "Leão Brasileiro de Luis": "Luis's Brazilian Lion", "Quanshian": "Quanshian nermeacos", "Rebekah": "Rebekah", "Jacob": "Jacob", "Esau": "Esau",
    "The Lion King": "The Lion King", 
    "The Lion King II: Simba's Pride": "The Lion King II: Simba's Pride", 
    "The Lion King 1½": "The Lion King 1½", 
    "The Lion Inside Me": "The Lion Inside Me", 
    "The Lion Inside Me 2: The Prínciple of Akin": "The Lion Inside Me 2: The Prínciple of Akin", 
    "The Lion Inside Me 3: The Mystery of Akin": "The Lion Inside Me 3: The Mystery of Akin"
  },
  "es": {
    "title": "AllCraft", "tagline": "¡Combina elementos y descubre nuevos!", "discovered_header": "Descubrimientos", "reset_button": "🔁 Reiniciar", "alert_new": "✨ Nuevo descubrimiento:", "alert_not_found": "❌ ¡No se encontró combinación!", "confirm_reset": "¿Estás seguro de que quieres reiniciar el juego?",
    "Fire": "Fuego", "Water": "Agua", "Earth": "Tierra", "Air": "Aire", "Steam": "Vapor", "Lava": "Lava", "Energy": "Energía", "Mud": "Barro", "Cloud": "Nube", "Thunderstorm": "Tormenta", "Dust": "Polvo", "Clay": "Arcilla", "Ocean": "Océano", "Plant": "Planta", "Smoke": "Humo", "Tornado": "Tornado", "Sand": "Arena", "Harmattan": "Harmattan", "Sandstorm": "Tormenta de Arena", "Tree": "Árbol", "Swamp": "Pantano", "Life": "Vida", "Bacteria": "Bacteria", "Seed": "Semilla", "Brick": "Ladrillo", "Wall": "Muro", "House": "Casa", "Wave": "Ola", "Metal": "Metal", "Tool": "Herramienta", "Time": "Tiempo", "Pressure": "Presión", "Stone": "Piedra", "Bridge": "Puente", "Farm": "Granja", "Field": "Campo", "Engine": "Motor", "Wheel": "Rueda", "Car": "Coche", "Robot": "Robot", "Dinosaur": "Dinosaurio", "Fossil": "Fósil", "Oil": "Petróleo", "Star": "Estrella", "Rocket": "Cohete", "Space": "Espacio", "Mountain": "Montaña", "Island": "Isla", "Volcano": "Volcán", "Eruption": "Erupción", "Forest": "Bosque", "Jungle": "Selva", "Windmill": "Molino de Vento", "Electricity": "Electricidad", "Light": "Luz", "Wind": "Vento", "Sun": "Sol", "Moon": "Luna", "Planet": "Planeta", "Dune": "Duna", "Eclipse": "Eclipse", "Pottery": "Alfarería", "Surf": "Surf", "Geyser": "Géiser", "Tea": "Té", "Human": "Humano", "Adam": "Adán", "Eve": "Eva", "Glass": "Vaso", "Light Bulb": "Bombilla", "Window": "Ventana", "Aquarium": "Acuario", "Hourglass": "Reloj de arena", "Fish": "Pez", "Bottle": "Botella", "Hole": "Agujero", "Door": "Puerta", "Cook": "Cocinar", "Weapon": "Arma", "Cave": "Cueva", "Campfire": "Hoguera", "Train": "Tren", "Cotton": "Algodón", "Cloth": "Tela", "Clothes": "Ropa", "Statue": "Estatua", "Color": "Tinta/Color", "Painting": "Pintura", "Book": "Libro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autor", "Idea": "Idea", "Copyright": "Derechos de Autor", "Work": "Obra", "Art": "Arte", "Museum": "Museu", "Public Domain": "Dominio Público", "Kitchen": "Cocina", "Restaurant": "Restaurante", "Hotel": "Hotel", "Recipe": "Receta", "Chef": "Chef", "Camera": "Cámara", "Projector": "Proyector", "Film": "Película/Cine", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patente", "Creativity": "Creatividad", "God": "Dios", "Cain": "Caín", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cam", "Japheth": "Jafet", "Abraham": "Abraham", "Sarah": "Sara", "Isaac": "Isaac", "Ishmael": "Ismael", "Hagar": "Agar", "Lot": "Lot", "Infinite": "Infinito", "City": "Ciudad", "Sacrifice": "Sacrificio", "Ark": "Arca", "Craft": "Creación", "Infinitecraft": "Infinite Craft", "All": "Todo", "Allcraft": "All Craft", "Dragon": "Dragón", "Cat": "Gato", "Bird": "Pájaro", "Lion": "León", "Tiger": "Tigre", "King": "Rey", "Brazil": "Brasil", "Luis": "Luis (Creador)", "Leão Brasileiro de Luis": "León Brasileño de Luis", "Quanshian": "Quanshian nermeacos", "Rebekah": "Rebeca", "Jacob": "Jacob", "Esau": "Esaú",
    "The Lion King": "El Rey León",
    "The Lion King II: Simba's Pride": "El Rey León 2: El tesoro de Simba",
    "The Lion King 1½": "El Rey León 3: Hakuna Matata",
    "The Lion Inside Me": "El León Dentro de Mí",
    "The Lion Inside Me 2: The Prínciple of Akin": "El León Dentro de Mí 2",
    "The Lion Inside Me 3: The Mystery of Akin": "El León Dentro de Mí 3"
  },
  "it": {
    "title": "AllCraft", "tagline": "Combina gli elementi e scoprine di nuovi!", "discovered_header": "Scoperte", "reset_button": "🔁 Resetta Gioco", "alert_new": "✨ Nuova scoperta:", "alert_not_found": "❌ Nessuna combinazione trovata!", "confirm_reset": "Sei sicuro di voler resettare il gioco?",
    "Fire": "Fuoco", "Water": "Acqua", "Earth": "Terra", "Air": "Aria", "Steam": "Vapore", "Lava": "Lava", "Energy": "Energia", "Mud": "Fango", "Cloud": "Nuvola", "Thunderstorm": "Temporale", "Dust": "Polvere", "Clay": "Argila", "Ocean": "Oceano", "Plant": "Pianta", "Smoke": "Fumo", "Tornado": "Tornado", "Sand": "Sabbia", "Tree": "Albero", "Swamp": "Palude", "Life": "Vita", "Bacteria": "Batteri", "Seed": "Seme", "Brick": "Mattone", "Wall": "Muro", "House": "Casa", "Wave": "Onda", "Metal": "Metallo", "Tool": "Strumento", "Time": "Tempo", "Pressure": "Pressione", "Stone": "Pietra", "Bridge": "Ponte", "Farm": "Fattoria", "Field": "Campo", "Engine": "Motore", "Wheel": "Ruota", "Car": "Auto", "Robot": "Robot", "Dinosaur": "Dinosauro", "Fossil": "Fossile", "Oil": "Olio", "Star": "Stella", "Rocket": "Razzo", "Space": "Spazio", "Mountain": "Montagna", "Island": "Isola", "Volcano": "Vulcano", "Eruption": "Eruzione", "Forest": "Foresta", "Jungle": "Giungla", "Windmill": "Mulino a vento", "Electricity": "Elettricità", "Light": "Luce", "Wind": "Vento", "Sun": "Sole", "Moon": "Luna", "Planet": "Pianeta", "Dune": "Duna", "Eclipse": "Eclissi", "Human": "Umano", "Adam": "Adamo", "Eve": "Eva", "Glass": "Vetro", "Light Bulb": "Lampadina", "Fish": "Pesce", "Bottle": "Bottiglia", "Hole": "Buco", "Door": "Porta", "Cook": "Cucinare", "Weapon": "Arma", "Cave": "Caverna", "Campfire": "Fuoco da campo", "Train": "Treno", "Cotton": "Cotone", "Cloth": "Stoffa", "Clothes": "Vestiti", "Statue": "Statua", "Color": "Colore", "Painting": "Dipinto", "Book": "Libro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autore", "Idea": "Idea", "Art": "Arte", "Museum": "Museo", "Kitchen": "Cucina", "Restaurant": "Ristorante", "Hotel": "Hotel", "Recipe": "Ricetta", "Chef": "Chef", "Camera": "Fotocamera", "Projector": "Proiettore", "Film": "Film", "God": "Dio", "City": "Città", "Ark": "Arca", "Dragon": "Drago", "Cat": "Gatto", "Bird": "Uccello", "Lion": "Leone", "Tiger": "Tigre", "King": "Re", "Brazil": "Brasile",
    "The Lion King": "Il Re Leone",
    "The Lion Inside Me": "Il Leone dentro di me"
  },
  "fr": {
    "title": "AllCraft", "tagline": "Combinez des éléments et découvrez-en de nouveaux!", "discovered_header": "Découvertes", "reset_button": "🔁 Réinitialiser", "alert_new": "✨ Nouvelle découverte:", "alert_not_found": "❌ Aucune combinaison trouvée!", "confirm_reset": "Êtes-vous sûr de vouloir réinitialiser le jeu?",
    "Fire": "Feu", "Water": "Eau", "Earth": "Terre", "Air": "Air", "Steam": "Vapeur", "Lava": "Lave", "Energy": "Énergie", "Mud": "Boue", "Cloud": "Nuage", "Thunderstorm": "Orage", "Dust": "Poussière", "Clay": "Argile", "Ocean": "Océan", "Plant": "Plante", "Smoke": "Fumée", "Tornado": "Tornade", "Sand": "Sable", "Harmattan": "Harmattan", "Sandstorm": "Tempête de Sable", "Tree": "Arbre", "Swamp": "Marais", "Life": "Vie", "Bacteria": "Bactérie", "Seed": "Graine", "Brick": "Brique", "Wall": "Mur", "House": "Maison", "Wave": "Vague", "Metal": "Métal", "Tool": "Outil", "Time": "Temps", "Pressure": "Pression", "Stone": "Pierre", "Bridge": "Pont", "Farm": "Ferme", "Field": "Champ", "Engine": "Moteur", "Wheel": "Roue", "Car": "Voiture", "Robot": "Robot", "Dinosaur": "Dinosaure", "Fossil": "Fossile", "Oil": "Pétrole", "Star": "Étoile", "Rocket": "Fusée", "Space": "Espace", "Mountain": "Montagne", "Island": "Île", "Volcano": "Volcan", "Eruption": "Éruption", "Forest": "Forêt", "Jungle": "Jungle", "Windmill": "Moulin à Vent", "Electricity": "Électricité", "Light": "Lumière", "Wind": "Vent", "Sun": "Soleil", "Moon": "Lune", "Planet": "Planète", "Dune": "Dune", "Eclipse": "Éclipse", "Pottery": "Poterie", "Surf": "Surf", "Geyser": "Geyser", "Tea": "Thé", "Human": "Humain", "Adam": "Adam", "Eve": "Ève", "Glass": "Verre", "Light Bulb": "Ampoule", "Window": "Fenêtre", "Aquarium": "Aquarium", "Hourglass": "Sablier", "Fish": "Poisson", "Bottle": "Bouteille", "Hole": "Trou", "Door": "Porte", "Cook": "Cuisiner", "Weapon": "Arma", "Cave": "Grotte", "Campfire": "Feu de camp", "Train": "Train", "Cotton": "Coton", "Cloth": "Tissu", "Clothes": "Vêtements", "Statue": "Statue", "Color": "Couleur/Peinture", "Painting": "Peinture", "Book": "Livre", "Library": "Bibliothèque", "Comet": "Comète", "Author": "Auteur", "Idea": "Idée", "Copyright": "Droit d'Auteur", "Work": "Œuvre", "Art": "Art", "Museum": "Musée", "Public Domain": "Domaine Public", "Kitchen": "Cuisine", "Restaurant": "Restaurant", "Hotel": "Hôtel", "Recipe": "Recette", "Chef": "Chef", "Camera": "Caméra", "Projector": "Projecteur", "Film": "Film/Cinéma", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Brevet", "Creativity": "Créativité", "God": "Dieu", "Cain": "Caïn", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cham", "Japheth": "Japhet", "Abraham": "Abraham", "Sarah": "Sarah", "Isaac": "Isaac", "Ishmael": "Ismaël", "Hagar": "Agar", "Lot": "Loth", "Infinite": "Infini", "City": "Ville", "Sacrifice": "Sacrifice", "Ark": "Arche", "Craft": "Création", "Infinitecraft": "Infinite Craft", "All": "Tout", "Allcraft": "All Craft", "Dragon": "Dragon", "Cat": "Chat", "Bird": "Oiseau", "Lion": "Lion", "Tiger": "Tigre", "King": "Roi", "Brazil": "Brésil", "Luis": "Luis (Créateur)", "Leão Brasileiro de Luis": "Lion Brésilien de Luis", "Quanshian": "Quanshian nermeacos", "Rebekah": "Rébecca", "Jacob": "Jacob", "Esau": "Ésaü",
    "The Lion King": "Le Roi Lion",
    "The Lion King II: Simba's Pride": "Le Roi Lion 2",
    "The Lion King 1½": "Le Roi Lion 3",
    "The Lion Inside Me": "Le Lion en Moi",
    "The Lion Inside Me 2: The Prínciple of Akin": "Le Lion en Moi 2",
    "The Lion Inside Me 3: The Mystery of Akin": "Le Lion en Moi 3"
  },
  "de": {
    "title": "AllCraft", "tagline": "Kombiniere Elemente und entdecke neue!", "discovered_header": "Entdeckungen", "reset_button": "🔁 Zurücksetzen", "alert_new": "✨ Neue Entdeckung:", "alert_not_found": "❌ Keine Kombination gefunden!", "confirm_reset": "Sind Sie sicher, dass Sie das Spiel zurücksetzen möchten?",
    "Fire": "Feuer", "Water": "Wasser", "Earth": "Erde", "Air": "Luft", "Steam": "Dampf", "Lava": "Lava", "Energy": "Energie", "Mud": "Schlamm", "Cloud": "Wolke", "Thunderstorm": "Gewitter", "Dust": "Ton", "Clay": "Ton", "Ocean": "Ozean", "Plant": "Pflanze", "Smoke": "Rauch", "Tornado": "Tornado", "Sand": "Sand", "Tree": "Baum", "Swamp": "Sumpf", "Life": "Leben", "Bacteria": "Bakterien", "Seed": "Samen", "Brick": "Ziegel", "Wall": "Mauer", "House": "Haus", "Wave": "Wellen", "Metal": "Metall", "Tool": "Werkzeug", "Time": "Zeit", "Pressure": "Druck", "Stone": "Stein", "Bridge": "Brücke", "Farm": "Bauernhof", "Field": "Feld", "Engine": "Motor", "Wheel": "Rad", "Car": "Auto", "Robot": "Roboter", "Dinosaur": "Dinosaurier", "Fossil": "Fossil", "Oil": "Öl", "Star": "Stern", "Rocket": "Rakete", "Space": "Weltraum", "Mountain": "Berg", "Island": "Insel", "Volcano": "Vulkan", "Eruption": "Eruption", "Forest": "Wald", "Jungle": "Dschungel", "Windmill": "Windmühle", "Electricity": "Elektrizität", "Light": "Licht", "Wind": "Wind", "Sun": "Sonne", "Moon": "Mond", "Planet": "Planet", "Dune": "Düne", "Eclipse": "Finsternis", "Human": "Mensch", "Adam": "Adam", "Eve": "Eva", "Glass": "Glas", "Light Bulb": "Glühbirne", "Fish": "Fisch", "Bottle": "Flasche", "Hole": "Loch", "Door": "Tür", "Cook": "Kochen", "Weapon": "Waffe", "Cave": "Höhle", "Campfire": "Lagerfeuer", "Train": "Zug", "Cotton": "Baumwolle", "Cloth": "Stoff", "Clothes": "Kleidung", "Statue": "Statue", "Color": "Farbe", "Painting": "Gemälde", "Book": "Buch", "Library": "Bibliothek", "Comet": "Komet", "Author": "Autor", "Idea": "Idee", "Art": "Kunst", "Museum": "Museum", "Kitchen": "Küche", "Restaurant": "Restaurant", "Hotel": "Hotel", "Recipe": "Rezept", "Chef": "Chef", "Camera": "Kamera", "Projector": "Projektor", "Film": "Film", "God": "Gott", "City": "Stadt", "Ark": "Arche", "Dragon": "Drache", "Cat": "Katze", "Bird": "Vogel", "Lion": "Löwe", "Tiger": "Tiger", "King": "König", "Brazil": "Brasilien",
    "The Lion King": "Der König der Löwen",
    "The Lion Inside Me": "Der Löwe in mir"
  },
  "ja": {
    "title": "AllCraft", "tagline": "要素を組み合わせて新しいものを発見しよう！", "discovered_header": "発見済み", "reset_button": "🔁 リセット", "alert_new": "✨ 新しい発見:", "alert_not_found": "❌ 組み合わせが見つかりませんでした！", "confirm_reset": "本当にゲームをリセットしますか？",
    "Fire": "火", "Water": "水", "Earth": "土", "Air": "空気", "Steam": "蒸気", "Lava": "溶岩", "Energy": "エネルギー", "Mud": "泥", "Cloud": "雲", "Thunderstorm": "雷雨", "Dust": "塵", "Clay": "粘土", "Ocean": "海", "Plant": "植物", "Smoke": "煙", "Tornado": "竜巻", "Sand": "砂", "Tree": "木", "Swamp": "沼", "Life": "生命", "Bacteria": "バクテリア", "Seed": "種", "Brick": "煉瓦", "Wall": "壁", "House": "家", "Wave": "波", "Metal": "金属", "Tool": "道具", "Time": "時間", "Pressure": "圧力", "Stone": "石", "Bridge": "橋", "Farm": "農場", "Field": "畑", "Engine": "エンジン", "Wheel": "車輪", "Car": "車", "Robot": "ロボット", "Dinosaur": "恐竜", "Fossil": "化石", "Oil": "石油", "Star": "星", "Rocket": "ロケット", "Space": "宇宙", "Mountain": "山", "Island": "島", "Volcano": "火山", "Eruption": "噴火", "Forest": "森", "Jungle": "ジャングル", "Windmill": "風車", "Electricity": "電気", "Light": "光", "Wind": "風", "Sun": "太陽", "Moon": "月", "Planet": "惑星", "Dune": "砂丘", "Eclipse": "日食", "Human": "人間", "Adam": "アダム", "Eve": "イヴ", "Glass": "ガラス", "Light Bulb": "電球", "Fish": "魚", "Bottle": "瓶", "Hole": "穴", "Door": "ドア", "Cook": "料理", "Weapon": "武器", "Cave": "洞窟", "Campfire": "キャンプファイヤー", "Train": "列車", "Cotton": "綿", "Cloth": "布", "Clothes": "服", "Statue": "彫像", "Color": "色", "Painting": "絵画", "Book": "本", "Library": "図書館", "Comet": "彗星", "Author": "著者", "Idea": "アイデア", "Art": "芸術", "Museum": "美術館", "Kitchen": "キッチン", "Restaurant": "レストラン", "Hotel": "ホテル", "Recipe": "レシピ", "Chef": "シェフ", "Camera": "カメラ", "Projector": "映写機", "Film": "映画", "God": "神", "City": "都市", "Ark": "箱舟", "Dragon": "ドラゴン", "Cat": "猫", "Bird": "鳥", "Lion": "ライオン", "Tiger": "トラ", "King": "王", "Brazil": "ブラジル",
    "The Lion King": "ライオン・キング",
    "The Lion Inside Me": "私の中のライオン"
  },
  "ko": {
    "title": "AllCraft", "tagline": "요소를 결합하고 새로운 것을 발견하세요!", "discovered_header": "발견 목록", "reset_button": "🔁 초기화", "alert_new": "✨ 새로운 발견:", "alert_not_found": "❌ 조합을 찾을 수 없습니다!", "confirm_reset": "정말로 게임을 초기화하시겠습니까?",
    "Fire": "불", "Water": "물", "Earth": "흙", "Air": "공기", "Steam": "증기", "Lava": "용암", "Energy": "에너지", "Mud": "진흙", "Cloud": "구름", "Thunderstorm": "천둥번개", "Dust": "먼지", "Clay": "점토", "Ocean": "바다", "Plant": "식물", "Smoke": "연기", "Tornado": "토네이도", "Sand": "모래", "Tree": "나무", "Swamp": "늪", "Life": "생명", "Bacteria": "박테리아", "Seed": "씨앗", "Brick": "벽돌", "Wall": "벽", "House": "집", "Wave": "파도", "Metal": "금속", "Tool": "도구", "Time": "시간", "Pressure": "압력", "Stone": "돌", "Bridge": "다리", "Farm": "농장", "Field": "밭", "Engine": "엔진", "Wheel": "바퀴", "Car": "차", "Robot": "로봇", "Dinosaur": "공룡", "Fossil": "화석", "Oil": "석유", "Star": "별", "Rocket": "로켓", "Space": "우주", "Mountain": "산", "Island": "섬", "Volcano": "화산", "Eruption": "분화", "Forest": "숲", "Jungle": "정글", "Windmill": "풍차", "Electricity": "전기", "Light": "빛", "Wind": "바람", "Sun": "태양", "Moon": "달", "Planet": "행성", "Dune": "모래 언덕", "Eclipse": "일식/월식", "Human": "인간", "Adam": "아담", "Eve": "이브", "Glass": "유리", "Light Bulb": "전구", "Fish": "물고기", "Bottle": "병", "Hole": "구멍", "Door": "문", "Cook": "요리", "Weapon": "무기", "Cave": "동굴", "Campfire": "캠프파이어", "Train": "기차", "Cotton": "목화", "Cloth": "천", "Clothes": "옷", "Statue": "조각상", "Color": "색", "Painting": "그림", "Book": "책", "Library": "도서관", "Comet": "혜성", "Author": "저자", "Idea": "아이디어", "Art": "예술", "Museum": "박물관", "Kitchen": "주방", "Restaurant": "레스토랑", "Hotel": "호텔", "Recipe": "레시피", "Chef": "셰프", "Camera": "카메라", "Projector": "영사기", "Film": "영화", "God": "신", "City": "도시", "Ark": "방주", "Dragon": "드래곤", "Cat": "고양이", "Bird": "새", "Lion": "사자", "Tiger": "호랑이", "King": "왕", "Brazil": "브라질",
    "The Lion King": "라이온 킹",
    "The Lion Inside Me": "내 안의 사자"
  },
  "zh": {
    "title": "AllCraft", "tagline": "组合元素，发现新元素！", "discovered_header": "已发现", "reset_button": "🔁 重置", "alert_new": "✨ 新发现:", "alert_not_found": "❌ 未找到组合！", "confirm_reset": "您确定要重置游戏吗？",
    "Fire": "火", "Water": "水", "Earth": "土", "Air": "空气", "Steam": "蒸汽", "Lava": "岩浆", "Energy": "能量", "Mud": "泥土", "Cloud": "云", "Thunderstorm": "雷暴", "Dust": "灰尘", "Clay": "粘土", "Ocean": "海洋", "Plant": "植物", "Smoke": "烟雾", "Tornado": "龙卷风", "Sand": "沙子", "Tree": "树", "Swamp": "沼泽", "Life": "生命", "Bacteria": "细菌", "Seed": "种子", "Brick": "砖", "Wall": "墙", "House": "房子", "Wave": "波浪", "Metal": "金属", "Tool": "工具", "Time": "时间", "Pressure": "压力", "Stone": "石头", "Bridge": "桥", "Farm": "农场", "Field": "田地", "Engine": "引擎", "Wheel": "轮子", "Car": "汽车", "Robot": "机器人", "Dinosaur": "恐龙", "Fossil": "化石", "Oil": "石油", "Star": "星星", "Rocket": "火箭", "Space": "太空", "Mountain": "山", "Island": "岛屿", "Volcano": "火山", "Eruption": "火山喷发", "Forest": "森林", "Jungle": "丛林", "Windmill": "风车", "Electricity": "电力", "Light": "光", "Wind": "风", "Sun": "太阳", "Moon": "月亮", "Planet": "行星", "Dune": "沙丘", "Eclipse": "日食/月食", "Human": "人类", "Adam": "亚当", "Eve": "夏娃", "Glass": "玻璃", "Light Bulb": "灯泡", "Fish": "鱼", "Bottle": "瓶子", "Hole": "洞", "Door": "门", "Cook": "烹饪", "Weapon": "武器", "Cave": "洞穴", "Campfire": "篝火", "Train": "火车", "Cotton": "棉花", "Cloth": "布", "Clothes": "衣服", "Statue": "雕像", "Color": "颜色", "Painting": "画", "Book": "书", "Library": "图书馆", "Comet": "彗星", "Author": "作者", "Idea": "主意", "Art": "艺术", "Museum": "博物馆", "Kitchen": "厨房", "Restaurant": "餐厅", "Hotel": "酒店", "Recipe": "食谱", "Chef": "厨师", "Camera": "相机", "Projector": "投影仪", "Film": "电影", "God": "神", "City": "城市", "Ark": "方舟", "Dragon": "龙", "Cat": "猫", "Bird": "鸟", "Lion": "狮子", "Tiger": "老虎", "King": "国王", "Brazil": "巴西",
    "The Lion King": "狮子王",
    "The Lion Inside Me": "我心中的狮子"
  },
  "uk": {
    "title": "AllCraft", "tagline": "Поєднуйте елементи та відкривайте нові!", "discovered_header": "Відкрито", "reset_button": "🔁 Скинути", "alert_new": "✨ Нове відкриття:", "alert_not_found": "❌ Комбінацію не знайдено!", "confirm_reset": "Ви впевнені, що хочете скинути гру?",
    "Fire": "Вогонь", "Water": "Вода", "Earth": "Земля", "Air": "Повітря", "Steam": "Пара", "Lava": "Лава", "Energy": "Енергія", "Mud": "Грязь", "Cloud": "Хмара", "Thunderstorm": "Гроза", "Dust": "Пил", "Clay": "Глина", "Ocean": "Океан", "Plant": "Рослина", "Smoke": "Дим", "Tornado": "Торнадо", "Sand": "Пісок", "Tree": "Дерево", "Swamp": "Болоto", "Life": "Життя", "Bacteria": "Бактерії", "Seed": "Насіння", "Brick": "Цегла", "Wall": "Стіна", "House": "Будинок", "Wave": "Хвиля", "Metal": "Метал", "Tool": "Інструмент", "Time": "Час", "Pressure": "Тиск", "Stone": "Камінь", "Bridge": "Міст", "Farm": "Ферма", "Field": "Поле", "Engine": "Двигун", "Wheel": "Колесо", "Car": "Машина", "Robot": "Робот", "Dinosaur": "Динозавр", "Fossil": "Викопне", "Oil": "Нафта", "Star": "Зірка", "Rocket": "Ракета", "Space": "Космос", "Mountain": "Гора", "Island": "Острів", "Volcano": "Вулкан", "Eruption": "Виверження", "Forest": "Ліс", "Jungle": "Джунглі", "Windmill": "Вітряк", "Electricity": "Електрика", "Light": "Світло", "Wind": "Вітер", "Sun": "Сонце", "Moon": "Місяць", "Planet": "Планета", "Dune": "Дюна", "Eclipse": "Затьмарення", "Human": "Людина", "Adam": "Адам", "Eve": "Єва", "Glass": "Скло", "Light Bulb": "Лампочка", "Fish": "Риба", "Bottle": "Пляшка", "Hole": "Отвір", "Door": "Двері", "Cook": "Готування", "Weapon": "Зброя", "Cave": "Печера", "Campfire": "Багаття", "Train": "Потяг", "Cotton": "Бавовна", "Cloth": "Тканина", "Clothes": "Одяг", "Statue": "Статуя", "Color": "Колір", "Painting": "Картина", "Book": "Книга", "Library": "Бібліотека", "Comet": "Комета", "Author": "Автор", "Idea": "Ідея", "Art": "Мистецтво", "Museum": "Музей", "Kitchen": "Кухня", "Restaurant": "Ресторан", "Hotel": "Готель", "Recipe": "Рецепт", "Chef": "Шеф-кухар", "Camera": "Камера", "Projector": "Проектор", "Film": "Фільм", "God": "Бог", "City": "Місто", "Ark": "Ковчег", "Dragon": "Дракон", "Cat": "Кіт", "Bird": "Птах", "Lion": "Лев", "Tiger": "Тигр", "King": "Король", "Brazil": "Бразилія",
    "The Lion King": "Король Лев",
    "The Lion Inside Me": "Лев у мені"
  },
  "ru": {
    "title": "AllCraft", "tagline": "Соединяйте элементы и открывайте новые!", "discovered_header": "Открытия", "reset_button": "🔁 Сбросить игру", "alert_new": "✨ Новое открытие:", "alert_not_found": "❌ Комбинация не найдена!", "confirm_reset": "Вы уверены, что хотите сбросить игру?",
    "Fire": "Огонь", "Water": "Вода", "Earth": "Земля", "Air": "Воздух", "Steam": "Пар", "Lava": "Лава", "Energy": "Энергия", "Mud": "Грязь", "Cloud": "Облако", "Thunderstorm": "Гроза", "Dust": "Пыль", "Clay": "Глина", "Ocean": "Океан", "Plant": "Растение", "Smoke": "Дым", "Tornado": "Торнадо", "Sand": "Песок", "Tree": "Дерево", "Swamp": "Болото", "Life": "Жизнь", "Bacteria": "Бактерии", "Seed": "Семена", "Brick": "Кирпич", "Wall": "Стена", "House": "Дом", "Wave": "Волна", "Metal": "Металл", "Tool": "Инструмент", "Time": "Время", "Pressure": "Давление", "Stone": "Камень", "Bridge": "Мост", "Farm": "Ферма", "Field": "Поле", "Engine": "Двигатель", "Wheel": "Колесо", "Car": "Машина", "Robot": "Робот", "Dinosaur": "Динозавр", "Fossil": "Ископаемое", "Oil": "Нефть", "Star": "Звезда", "Rocket": "Ракета", "Space": "Космос", "Mountain": "Гора", "Island": "Остров", "Volcano": "Вулкан", "Eruption": "Извержение", "Forest": "Лес", "Jungle": "Джунгли", "Windmill": "Ветряная мельница", "Electricity": "Электричество", "Light": "Свет", "Wind": "Ветер", "Sun": "Солнце", "Moon": "Луна", "Planet": "Планета", "Human": "Человек", "Adam": "Адам", "Eve": "Ева", "Glass": "Стекло", "Light Bulb": "Лампочка", "Fish": "Рыба", "God": "Бог", "City": "Город", "Dragon": "Дракон", "Lion": "Лев", "King": "Король", "Brazil": "Бразилия",
    "The Lion King": "Король Лев",
    "The Lion Inside Me": "Лев внутри меня"
  },
  "ar": {
    "title": "AllCraft", "tagline": "اجمع العناصر واكتشف عناصر جديدة!", "discovered_header": "الاكتشافات", "reset_button": "🔁 إعادة ضبط اللعبة", "alert_new": "✨ اكتشاف جديد:", "alert_not_found": "❌ لم يتم العثور على مزيج!", "confirm_reset": "هل أنت متأكد أنك تريد إعادة ضبط اللعبة؟",
    "Fire": "نار", "Water": "ماء", "Earth": "أرض", "Air": "هواء", "Steam": "بخار", "Lava": "حمم", "Energy": "طاقة", "Mud": "طين", "Cloud": "سحابة", "Thunderstorm": "عاصفة رعدية", "Dust": "غبار", "Clay": "صلصال", "Ocean": "محيط", "Plant": "نبات", "Smoke": "دخان", "Tornado": "إعصار", "Sand": "رمل", "Tree": "شجرة", "Swamp": "مستنقع", "Life": "حياة", "Bacteria": "بكتيريا", "Seed": "بذرة", "Brick": "طوب", "Wall": "جدار", "House": "منزل", "Wave": "موجة", "Metal": "معدن", "Tool": "أداة", "Time": "وقت", "Pressure": "ضغط", "Stone": "حجر", "Bridge": "جسر", "Farm": "مزرعة", "Field": "حقل", "Engine": "محرك", "Wheel": "عجلة", "Car": "سيارة", "Robot": "روبوت", "Dinosaur": "ديناصور", "Fossil": "أحفورة", "Oil": "نفط", "Star": "نجمة", "Rocket": "صاروخ", "Space": "فضاء", "Mountain": "جبل", "Island": "جزيرة", "Volcano": "بركان", "Eruption": "ثوران", "Forest": "غابة", "Jungle": "غابة كثيفة", "Windmill": "طاحونة هوائية", "Electricity": "كهرباء", "Light": "ضوء", "Wind": "ريح", "Sun": "شمس", "Moon": "قمر", "Planet": "كوكب", "Human": "إنسان", "Adam": "آدم", "Eve": "حواء", "Glass": "زجاج", "Light Bulb": "مصباح", "Fish": "سمكة", "God": "الله", "City": "مدينة", "Dragon": "تنين", "Lion": "أسد", "King": "ملك", "Brazil": "البرازيل",
    "The Lion King": "الأسد الملك",
    "The Lion Inside Me": "الأسد الذي بداخلي"
  },
  "hi": {
    "title": "AllCraft", "tagline": "तत्वों को मिलाएं और नए खोजें!", "discovered_header": "खोजें", "reset_button": "🔁 गेम रीसेट करें", "alert_new": "✨ नई खोज:", "alert_not_found": "❌ कोई संयोजन नहीं मिला!", "confirm_reset": "क्या आप वाकई गेम को रीसेट करना चाहते हैं?",
    "Fire": "आग", "Water": "पानी", "Earth": "पृथ्वी", "Air": "हवा", "Steam": "भाप", "Lava": "लावा", "Energy": "ऊर्जा", "Mud": "कीचड़", "Cloud": "बादल", "Thunderstorm": "आंधी", "Dust": "धूल", "Clay": "मिट्टी", "Ocean": "महासागर", "Plant": "पौधा", "Smoke": "धुआं", "Tornado": "बवंडर", "Sand": "रेत", "Tree": "पेड़", "Swamp": "दलदल", "Life": "जीवन", "Bacteria": "बैक्टीरिया", "Seed": "बीज", "Brick": "ईंट", "Wall": "दीवार", "House": "घर", "Wave": "लहर", "Metal": "धातु", "Tool": "उपकरण", "Time": "समय", "Pressure": "दबाव", "Stone": "पत्थर", "Bridge": "पुल", "Farm": "फार्म", "Field": "खेत", "Engine": "इंजन", "Wheel": "पहिया", "Car": "कार", "Robot": "रोबोट", "Dinosaur": "डायनासोर", "Fossil": "जीवाश्म", "Oil": "तेल", "Star": "तारा", "Rocket": "रॉकेट", "Space": "अंतरिक्ष", "Mountain": "पहाड़", "Island": "द्वीप", "Volcano": "ज्वालामुखी", "Eruption": "विस्फोट", "Forest": "वन", "Jungle": "जंगल", "Windmill": "पवन चक्की", "Electricity": "बिजली", "Light": "प्रकाश", "Wind": "हवा", "Sun": "सूरज", "Moon": "चाँद", "Planet": "ग्रह", "Human": "मानव", "Adam": "आदम", "Eve": "हव्वा", "Glass": "कांच", "Light Bulb": "बल्ब", "Fish": "मछली", "God": "भगवान", "City": "शहर", "Dragon": "ड्रैगन", "Lion": "शेर", "King": "राजा", "Brazil": "ब्राजील",
    "The Lion King": "द लायन किंग",
    "The Lion Inside Me": "मेरे अंदर का शेर"
  },
  "tr": {
    "title": "AllCraft", "tagline": "Elementleri birleştir ve yenilerini keşfet!", "discovered_header": "Keşifler", "reset_button": "🔁 Oyunu Sıfırla", "alert_new": "✨ Yeni keşif:", "alert_not_found": "❌ Kombinasyon bulunamadı!", "confirm_reset": "Oyunu sıfırlamak istediğinizden emin misiniz?",
    "Fire": "Ateş", "Water": "Su", "Earth": "Toprak", "Air": "Hava", "Steam": "Buhar", "Lava": "Lav", "Energy": "Enerji", "Mud": "Çamur", "Cloud": "Bulut", "Thunderstorm": "Fırtına", "Dust": "Toz", "Clay": "Kil", "Ocean": "Okyanus", "Plant": "Bitki", "Smoke": "Duman", "Tornado": "Hortum", "Sand": "Kum", "Tree": "Ağaç", "Swamp": "Bataklık", "Life": "Yaşam", "Bacteria": "Bakteri", "Seed": "Tohum", "Brick": "Tuğla", "Wall": "Duvar", "House": "Ev", "Wave": "Dalga", "Metal": "Metal", "Tool": "Alet", "Time": "Zaman", "Pressure": "Basınç", "Stone": "Taş", "Bridge": "Köprü", "Farm": "Çiftlik", "Field": "Tarla", "Engine": "Motor", "Wheel": "Tekerlek", "Car": "Araba", "Robot": "Robot", "Dinosaur": "Dinozor", "Fossil": "Fosil", "Oil": "Petrol", "Star": "Yıldız", "Rocket": "Roket", "Space": "Uzay", "Mountain": "Dağ", "Island": "Ada", "Volcano": "Volkan", "Eruption": "Patlama", "Forest": "Orman", "Jungle": "Jungle", "Windmill": "Yel Değirmeni", "Electricity": "Elektrik", "Light": "Işık", "Wind": "Rüzgar", "Sun": "Güneş", "Moon": "Ay", "Planet": "Gezegen", "Human": "İnsan", "Adam": "Adem", "Eve": "Havva", "Glass": "Cam", "Light Bulb": "Ampul", "Fish": "Balık", "God": "Tanrı", "City": "Şehir", "Dragon": "Ejderha", "Lion": "Aslan", "King": "Kral", "Brazil": "Brezilya",
    "The Lion King": "Aslan Kral",
    "The Lion Inside Me": "İçimdeki Aslan"
  }
};

// ==========================================
// 3. ELEMENTOS E EMOJIS
// ==========================================
const elements = {
    // Elementos Básicos
    "Fire": "🔥", "Water": "💧", "Earth": "🌍", "Air": "🌬️", "Steam": "💨", "Lava": "🌋", "Energy": "⚡", "Mud": "🪵", 
    "Cloud": "☁️", "Thunderstorm": "⛈️", "Dust": "🌫️", "Clay": "🧱", "Ocean": "🌊", "Plant": "🌿", "Smoke": "🚬",
    "Tornado": "🌪️", "Sand": "🏖️", "Harmattan": "🏜️", "Sandstorm": "🌬️🏜️", "Tree": "🌳", "Swamp": "🐊", "Life": "🧬",
    
    // Construção e Tecnologia
    "Bacteria": "🔬", "Seed": "🌱", "Brick": "🧱", "Wall": "🧱", "House": "🏠", "Wave": "🌊", "Metal": "🔩",
    "Tool": "⛏️", "Time": "⏳", "Pressure": "🏋️", "Stone": "🪨", "Bridge": "🌉", "Farm": "🧑‍🌾", "Field": "🌾",
    "Engine": "⚙️", "Wheel": "🔘", "Car": "🚗", "Robot": "🤖", "Dinosaur": "🦖", "Fossil": "🦴", "Oil": "🛢️",
    
    // Espaço e Natureza
    "Star": "⭐", "Rocket": "🚀", "Space": "🌌", "Mountain": "⛰️", "Island": "🏝️", "Volcano": "🌋", "Eruption": "💥",
    "Forest": "🌲", "Jungle": "🌳🐒", "Windmill": "🌬️⚙️", "Electricity": "🔌", "Light": "💡", "Wind": "🍃", "Sun": "☀️",
    "Moon": "🌙", "Planet": "🪐", "Dune": "🐪", "Eclipse": "🌑", "Pottery": "🏺", "Surf": "🏄", "Geyser": "🚿",
    
    // Humanidade e Civilização
    "Tea": "☕", "Human": "👤", "Adam": "👨", "Eve": "👩", "Glass": "🍷", "Light Bulb": "💡", "Window": "🖼️",
    "Aquarium": "🐠", "Hourglass": "⌛", "Fish": "🐟", "Bottle": "🍾", "Hole": "🕳️", "Door": "🚪", "Cook": "🍳",
    "Weapon": "⚔️", "Cave": "🦇", "Campfire": "🔥", "Train": "🚆", "Cotton": "☁️", "Cloth": "🧵", "Clothes": "👕",
    "Statue": "🗽", "Color": "🎨", "Painting": "🖼️", "Book": "📖", "Library": "📚", "Comet": "☄️", "Author": "✍️",
    "Idea": "🧠", "Copyright": "©️", "Work": "💼", "Art": "🎨🎭", "Museum": "🏛️", "Public Domain": "🌐",
    
    // Profissões e Lugares
    "Kitchen": "🍳", "Restaurant": "🍽️", "Hotel": "🏨", "Recipe": "📜", "Chef": "👨‍🍳", "Camera": "📸",
    "Projector": "📽️", "Film": "🎞️", "Hollywood": "🎬", "Bollywood": "💃", "Patent": "📜", "Creativity": "🌈",
    
    // Bíblicos e Épicos
    "God": "✨", "Cain": "🔪", "Abel": "🐑", "Noah": "🚢", "Shem": "📜", "Ham": "🔨", "Japheth": "🗺️",
    "Infinite": "♾️", "City": "🏙️", "Sacrifice": "🕯️", "Ark": "🛶", "Craft": "⚒️", "Infinitecraft": "🛠️",
    "All": "🌌", "Allcraft": "🌠", "Abraham": "🧔‍♂️", "Sarah": "🤱", "Isaac": "🧒", "Ishmael": "🏹",
    "Hagar": "🏺", "Lot": "🧂", "Rebekah": "🏺", "Jacob": "🪜", "Esau": "🏹",
    
    // Animais e Especiais
    "Dragon": "🐉", "Cat": "🐱", "Bird": "🐦", "Lion": "🦁", "Tiger": "🐯", "King": "👑", 
    "Brazil": "🇧🇷", "Luis": "👨‍💻", "Leão Brasileiro de Luis": "🦁🇧🇷", "Quanshian": "✨🐲", 
    
    // Sua Saga: O Leão Dentro de Mim & Rei Leão (Versão Melhorada)
    "The Lion King": "🦁👑🌅", 
    "The Lion King II: Simba's Pride": "🦁👑⚖️🦁", 
    "The Lion King 1½": "🦁👑🍿🐗", 
    
    "The Lion Inside Me": "🦁🌌😔💧", 
    "The Lion Inside Me 2: The Prínciple of Akin": "🦁🐾📜🌌", 
    "The Lion Inside Me 3: The Mystery of Akin": "🦁🕵🏻‍♂️🧩🌌"
};

// ==========================================
// 4. RECEITAS
// ==========================================
const recipes = {
    // Natureza e Elementos Base
    "Fire+Water": "Steam", 
    "Fire+Earth": "Lava", 
    "Fire+Air": "Energy", 
    "Water+Earth": "Mud", 
    "Water+Air": "Cloud", 
    "Earth+Air": "Dust",
    "Cloud+Energy": "Thunderstorm", 
    "Mud+Water": "Clay", 
    "Water+Water": "Ocean", 
    "Steam+Energy": "Smoke", 
    "Mud+Life": "Plant", 
    "Dust+Lava": "Sand",
    "Ocean+Air": "Tornado", 
    "Tornado+Sand": "Harmattan", 
    "Tornado+Dust": "Sandstorm", 
    "Plant+Tree": "Forest", 
    "Mud+Tree": "Swamp",
    "Clay+Fire": "Brick", 
    "Brick+Water": "Pottery", 
    "Energy+Swamp": "Life", 
    "Life+Mud": "Bacteria", 
    "Plant+Dust": "Seed",
    "Brick+Brick": "Wall", 
    "Wall+Tree": "House", 
    "Wave+Ocean": "Wave", 
    "Lava+Earth": "Metal", 
    "Metal+Tree": "Tool",
    "Time+Dust": "Time", 
    "Lava+Water": "Stone", 
    "Wall+Water": "Bridge", 
    "Plant+House": "Farm", 
    "Earth+Seed": "Field",
    "Steam+Metal": "Engine", 
    "Stone+Tool": "Wheel", 
    "Engine+Wheel": "Car", 
    "Time+Swamp": "Dinosaur", 
    "Dinosaur+Sand": "Fossil",
    "Fossil+Pressure": "Oil", 
    "Dust+Energy": "Star", 
    "Car+Steam": "Rocket", 
    "Air+House": "Windmill", 
    "Earth+Stone": "Mountain",
    "Ocean+Earth": "Island", 
    "Mountain+Lava": "Volcano", 
    "Volcano+Energy": "Eruption", 
    "Tree+Tree": "Forest", 
    "Forest+Swamp": "Jungle", 
    "Windmill+Energy": "Electricity", 
    "Life+Electricity": "Robot", 
    "Energy+Star": "Light", 
    "Cloud+Star": "Space",
    "Ocean+Earth": "Pressure", 
    "Fire+Star": "Sun", 
    "Earth+Space": "Moon", 
    "Earth+Ocean": "Planet", 
    "Sand+Sand": "Dune",
    "Sun+Moon": "Eclipse", 
    "Wave+Human": "Surf", 
    "Steam+Pressure": "Geyser", 
    "Plant+Steam": "Tea", 
    "Life+Earth": "Human",
    
    // Sociedade e Conhecimento
    "Human+Time": "Adam", 
    "Adam+Plant": "Eve", 
    "Sand+Fire": "Glass", 
    "Glass+Light": "Light Bulb", 
    "Glass+Wall": "Window",
    "Glass+Water": "Aquarium", 
    "Glass+Time": "Hourglass", 
    "Aquarium+Plant": "Fish", 
    "Pottery+Glass": "Bottle", 
    "Tool+Wall": "Hole",
    "Hole+Wall": "Door", 
    "Human+Fire": "Cook", 
    "Human+Metal": "Weapon", 
    "Human+Wall": "Cave", 
    "Cave+Fire": "Campfire",
    "Human+Book": "Author", 
    "Author+Light": "Idea", 
    "Author+Tool": "Copyright", 
    "Idea+Book": "Work", 
    "Color+Tool": "Art",
    "Art+House": "Museum", 
    "Book+Time": "Public Domain", 
    "Cook+House": "Kitchen", 
    "Kitchen+Wall": "Restaurant",
    "Restaurant+House": "Hotel", 
    "Cook+Book": "Recipe", 
    "Human+Kitchen": "Chef", 
    "Light Bulb+Glass": "Camera",
    "Camera+Light": "Projector", 
    "Projector+Wall": "Film", 
    "Film+House": "Hollywood", 
    "Film+Dune": "Bollywood",
    "Idea+Copyright": "Patent", 
    "Author+Idea": "Creativity", 
    "Energy+Space": "God",
    
    // Linhagem Bíblica
    "Human+Farm": "Cain", 
    "Human+Life": "Abel", 
    "Human+Ocean": "Noah", 
    "Noah+Book": "Shem", 
    "Noah+Tool": "Ham", 
    "Noah+Planet": "Japheth",
    "God+Adam": "Abraham", 
    "Abraham+Eve": "Sarah", 
    "Abraham+Sarah": "Isaac", 
    "Abraham+Sand": "Hagar",
    "Abraham+Hagar": "Ishmael", 
    "Abraham+City": "Lot", 
    "Isaac+Sarah": "Rebekah", 
    "Isaac+Rebekah": "Jacob", 
    "Isaac+Pottery": "Esau",

    // Animais e Criaturas
    "Lava+Lava": "Dragon",
    "Life+House": "Cat",
    "Life+Air": "Bird",
    "Life+Forest": "Lion",
    "Life+Jungle": "Tiger",
    "Lion+Statue": "King", 
    
    // Brasil e Criador
    "Earth+Jungle": "Brazil",
    "Human+Creativity": "Luis",
    "Brazil+Luis": "Leão Brasileiro de Luis",
    "God+Dragon": "Quanshian",

    // Meta-Elementos
    "Cain+Cain": "City", 
    "Abel+Fire": "Sacrifice", 
    "Noah+Mountain": "Ark", 
    "Tool+Human": "Craft", 
    "God+Time": "Infinite", 
    "Infinite+Craft": "Infinitecraft", 
    "Infinite+Infinitecraft": "All", 
    "All+Craft": "Allcraft",

    // SUA SAGA E REI LEÃO (Implementadas)
    "King+Lion": "The Lion King",
    "The Lion King+Stone": "The Lion King II: Simba's Pride",
    "The Lion King+Star": "The Lion King 1½",
    "Luis+Lion": "The Lion Inside Me",
    "The Lion Inside Me+Jacob": "The Lion Inside Me 2: The Prínciple of Akin",
    "The Lion Inside Me 2: The Prínciple of Akin+Idea": "The Lion Inside Me 3: The Mystery of Akin"
};

// ==========================================
// 5. LÓGICA DO MOTOR DO JOGO
// ==========================================
const elementsDiv = document.getElementById("elements");
const discoveredDiv = document.getElementById("discovered");

function getTranslation(key) {
    const langSet = translations[currentLang] || translations["en"];
    return langSet[key] || key;
}

function translateInterface() {
    document.title = getTranslation("title");
    const h1 = document.querySelector("h1");
    if (h1) h1.innerHTML = "⚛️ " + getTranslation("title");
    
    const p = document.querySelector("p");
    if (p) p.textContent = getTranslation("tagline");
    
    const h2 = document.querySelector("h2");
    if (h2) h2.textContent = getTranslation("discovered_header");
    
    const btn = document.getElementById("resetBtn");
    if (btn) btn.textContent = getTranslation("reset_button");
}

function renderElements() {
    elementsDiv.innerHTML = "";
    basics.forEach(el => {
        let div = document.createElement("div");
        div.className = "element";
        div.textContent = (elements[el] || "") + " " + getTranslation(el);
        div.onclick = () => selectElement(el);
        elementsDiv.appendChild(div);
    });

    discoveredDiv.innerHTML = "";
    discovered.forEach(el => {
        let div = document.createElement("div");
        div.className = "element";
        div.textContent = (elements[el] || "") + " " + getTranslation(el);
        div.onclick = () => selectElement(el);
        discoveredDiv.appendChild(div);
    });
}

function selectElement(el) {
    if (!firstPick) {
        firstPick = el;
        // Opcional: Adicionar classe visual de "selecionado"
    } else {
        combine(firstPick, el);
        firstPick = null;
    }
}

function combine(a, b) {
    let key1 = a + "+" + b;
    let key2 = b + "+" + a;
    let result = recipes[key1] || recipes[key2];

    if (result) {
        if (!discovered.has(result) && !basics.includes(result)) {
            discovered.add(result);
            saveGame();
            renderElements();
            alert(getTranslation("alert_new") + " " + (elements[result] || "") + " " + getTranslation(result));
        }
    } else {
        alert(getTranslation("alert_not_found"));
    }
}

function saveGame() {
    localStorage.setItem("allcraft_discovered", JSON.stringify([...discovered]));
}

function loadGame() {
    let saved = localStorage.getItem("allcraft_discovered");
    if (saved) {
        discovered = new Set(JSON.parse(saved));
    }
}

function resetGame() {
    if (confirm(getTranslation("confirm_reset"))) {
        discovered = new Set();
        saveGame();
        renderElements();
    }
}

// ==========================================
// 6. INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    translateInterface();
    renderElements();
    
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetGame);
});

// Função para ser chamada via console ou botões de bandeira
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        translateInterface();
        renderElements();
    }
}