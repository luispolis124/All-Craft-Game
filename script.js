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
    "Fire": "Fogo", "Water": "Água", "Earth": "Terra", "Air": "Ar", "Steam": "Vapor", "Lava": "Lava", "Energy": "Energia", "Mud": "Lama", "Cloud": "Nuvem", "Thunderstorm": "Tempestade", "Dust": "Poeira", "Clay": "Argila", "Ocean": "Oceano", "Plant": "Planta", "Smoke": "Fumaça", "Tornado": "Tornado", "Sand": "Areia", "Harmattan": "Harmattan", "Sandstorm": "Tempestade de Areia", "Tree": "Árvore", "Swamp": "Pântano", "Life": "Vida", "Bacteria": "Bactéria", "Seed": "Semente", "Brick": "Tijolo", "Wall": "Muro", "House": "Casa", "Wave": "Onda", "Metal": "Metal", "Tool": "Ferramenta", "Time": "Tempo", "Pressure": "Pressão", "Stone": "Pedra", "Bridge": "Ponte", "Farm": "Fazenda", "Field": "Campo", "Engine": "Motor", "Wheel": "Roda", "Car": "Carro", "Robot": "Robô", "Dinosaur": "Dinossauro", "Fossil": "Fóssil", "Oil": "Óleo", "Star": "Estrela", "Rocket": "Foguete", "Space": "Espaço", "Mountain": "Montanha", "Island": "Ilha", "Volcano": "Vulcão", "Eruption": "Erupção", "Forest": "Floresta", "Jungle": "Selva", "Windmill": "Moinho de Vento", "Electricity": "Eletricidade", "Light": "Luz", "Wind": "Vento", "Sun": "Sol", "Moon": "Lua", "Planet": "Planeta", "Dune": "Duna", "Eclipse": "Eclipse", "Pottery": "Olaria", "Surf": "Surf", "Geyser": "Gêiser", "Tea": "Chá", "Human": "Humano", "Adam": "Adão", "Eve": "Eva", "Glass": "Vidro", "Light Bulb": "Lâmpada", "Window": "Janela", "Aquarium": "Aquário", "Hourglass": "Ampulheta", "Fish": "Peixe", "Bottle": "Garrafa", "Hole": "Buraco", "Door": "Porta", "Cook": "Cozinhar", "Weapon": "Arma", "Cave": "Caverna", "Campfire": "Fogueira", "Train": "Trem", "Cotton": "Algodão", "Cloth": "Tecido", "Clothes": "Roupa", "Statue": "Estátua", "Color": "Tinta/Cor", "Painting": "Pintura", "Book": "Livro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autor", "Idea": "Ideia", "Copyright": "Direitos Autorais", "Work": "Obra", "Art": "Arte", "Museum": "Museu", "Public Domain": "Domínio Público", "Kitchen": "Cozinha", "Restaurant": "Restaurante", "Hotel": "Hotel", "Recipe": "Receita", "Chef": "Chef", "Camera": "Câmera", "Projector": "Projetor", "Film": "Filme/Cinema", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patente", "Creativity": "Criatividade", "God": "Deus", "Cain": "Caim", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cam", "Japheth": "Jafé", "Abraham": "Abraão", "Sarah": "Sara", "Isaac": "Isaque", "Ishmael": "Ismael", "Hagar": "Agar", "Lot": "Ló", "Infinite": "Infinito", "City": "Cidade", "Sacrifice": "Sacrifício", "Ark": "Arca", "Craft": "Criação", "Infinitecraft": "Infinite Craft", "All": "Tudo", "Allcraft": "All Craft", "Dragon": "Dragão", "Cat": "Gato", "Bird": "Pássaro", "Lion": "Leão", "Tiger": "Tigre", "King": "Rei", "Brazil": "Brasil", "Luis": "Luis (Criador)", "Leão Brasileiro de Luis": "Leão Brasileiro de Luis", "Quanshian": "Quanshian nermeacos", "Rebekah": "Rebeca", "Jacob": "Jacó", "Esau": "Esaú", "The Lion King": "O Rei Leão", "The Lion King II: Simba's Pride": "O Rei Leão 2", "The Lion King 1½": "O Rei Leão 3", "The Lion Inside Me": "O Leão Dentro de Mim"
  },
  "en": {
    "title": "AllCraft", "tagline": "Combine elements and discover new ones!", "discovered_header": "Discovered", "reset_button": "🔁 Reset Game", "alert_new": "✨ New discovery:", "alert_not_found": "❌ No combination found!", "confirm_reset": "Are you sure you want to reset the game?",
    "Fire": "Fire", "Water": "Water", "Earth": "Earth", "Air": "Air", "Steam": "Steam", "Lava": "Lava", "Energy": "Energy", "Mud": "Mud", "Cloud": "Cloud", "Thunderstorm": "Thunderstorm", "Dust": "Dust", "Clay": "Clay", "Ocean": "Ocean", "Plant": "Plant", "Smoke": "Smoke", "Tornado": "Tornado", "Sand": "Sand", "Harmattan": "Harmattan", "Sandstorm": "Sandstorm", "Tree": "Tree", "Swamp": "Swamp", "Life": "Life", "Bacteria": "Bacteria", "Seed": "Seed", "Brick": "Brick", "Wall": "Wall", "House": "House", "Wave": "Wave", "Metal": "Metal", "Tool": "Tool", "Time": "Time", "Pressure": "Pressure", "Stone": "Stone", "Bridge": "Bridge", "Farm": "Farm", "Field": "Field", "Engine": "Engine", "Wheel": "Wheel", "Car": "Car", "Robot": "Robot", "Dinosaur": "Dinosaur", "Fossil": "Fossil", "Oil": "Oil", "Star": "Star", "Rocket": "Rocket", "Space": "Space", "Mountain": "Mountain", "Island": "Island", "Volcano": "Volcano", "Eruption": "Eruption", "Forest": "Forest", "Jungle": "Jungle", "Windmill": "Windmill", "Electricity": "Electricity", "Light": "Light", "Wind": "Wind", "Sun": "Sun", "Moon": "Moon", "Planet": "Planet", "Dune": "Dune", "Eclipse": "Eclipse", "Pottery": "Pottery", "Surf": "Surf", "Geyser": "Geyser", "Tea": "Tea", "Human": "Human", "Adam": "Adam", "Eve": "Eve", "Glass": "Glass", "Light Bulb": "Light Bulb", "Window": "Window", "Aquarium": "Aquarium", "Hourglass": "Hourglass", "Fish": "Fish", "Bottle": "Bottle", "Hole": "Hole", "Door": "Door", "Cook": "Cook", "Weapon": "Weapon", "Cave": "Cave", "Campfire": "Campfire", "Train": "Train", "Cotton": "Cotton", "Cloth": "Cloth", "Clothes": "Clothes", "Statue": "Statue", "Color": "Color/Paint", "Painting": "Painting", "Book": "Book", "Library": "Library", "Comet": "Comet", "Author": "Author", "Idea": "Idea", "Copyright": "Copyright", "Work": "Work", "Art": "Art", "Museum": "Museum", "Public Domain": "Public Domain", "Kitchen": "Kitchen", "Restaurant": "Restaurant", "Hotel": "Hotel", "Recipe": "Recipe", "Chef": "Chef", "Camera": "Camera", "Projector": "Projector", "Film": "Film", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patent", "Creativity": "Creativity", "God": "God", "Cain": "Cain", "Abel": "Abel", "Noah": "Noah", "Shem": "Shem", "Ham": "Ham", "Japheth": "Japheth", "Abraham": "Abraham", "Sarah": "Sarah", "Isaac": "Isaac", "Ishmael": "Ishmael", "Hagar": "Hagar", "Lot": "Lot", "Infinite": "Infinite", "City": "City", "Sacrifice": "Sacrifice", "Ark": "Ark", "Craft": "Craft", "Infinitecraft": "Infinite Craft", "All": "All", "Allcraft": "All Craft", "Dragon": "Dragon", "Cat": "Cat", "Bird": "Bird", "Lion": "Lion", "Tiger": "Tiger", "King": "King", "Brazil": "Brazil", "Luis": "Luis", "Leão Brasileiro de Luis": "Luis' Brazilian Lion", "Quanshian": "Quanshian", "Rebekah": "Rebekah", "Jacob": "Jacob", "Esau": "Esau", "The Lion King": "The Lion King", "The Lion King II: Simba's Pride": "The Lion King 2", "The Lion King 1½": "The Lion King 3", "The Lion Inside Me": "The Lion Inside Me"
  },
  "es": {
    "title": "AllCraft", "tagline": "¡Combina elementos y descubre nuevos!", "discovered_header": "Descubrimientos", "reset_button": "🔁 Reiniciar", "alert_new": "✨ Nuevo descubrimiento:", "alert_not_found": "❌ ¡No se encontró combinación!", "confirm_reset": "¿Estás seguro de que quieres reiniciar?",
    "Fire": "Fuego", "Water": "Agua", "Earth": "Tierra", "Air": "Aire", "Steam": "Vapor", "Lava": "Lava", "Energy": "Energía", "Mud": "Barro", "Cloud": "Nube", "Thunderstorm": "Tormenta", "Dust": "Polvo", "Clay": "Arcilla", "Ocean": "Océano", "Plant": "Planta", "Smoke": "Humo", "Tornado": "Tornado", "Sand": "Arena", "Harmattan": "Harmattan", "Sandstorm": "Tormenta de Arena", "Tree": "Árbol", "Swamp": "Pantano", "Life": "Vida", "Bacteria": "Bacteria", "Seed": "Semilla", "Brick": "Ladrillo", "Wall": "Muro", "House": "Casa", "Wave": "Ola", "Metal": "Metal", "Tool": "Herramienta", "Time": "Tiempo", "Pressure": "Presión", "Stone": "Piedra", "Bridge": "Puente", "Farm": "Granja", "Field": "Campo", "Engine": "Motor", "Wheel": "Rueda", "Car": "Coche", "Robot": "Robot", "Dinosaur": "Dinosaurio", "Fossil": "Fósil", "Oil": "Petróleo", "Star": "Estrella", "Rocket": "Cohete", "Space": "Espacio", "Mountain": "Montaña", "Island": "Isla", "Volcano": "Volcán", "Eruption": "Erupción", "Forest": "Bosque", "Jungle": "Selva", "Windmill": "Molino de Viento", "Electricity": "Electricidad", "Light": "Luz", "Wind": "Viento", "Sun": "Sol", "Moon": "Luna", "Planet": "Planeta", "Dune": "Duna", "Eclipse": "Eclipse", "Pottery": "Alfarería", "Surf": "Surf", "Geyser": "Géiser", "Tea": "Té", "Human": "Humano", "Adam": "Adán", "Eve": "Eva", "Glass": "Vidrio", "Light Bulb": "Bombilla", "Window": "Ventana", "Aquarium": "Acuario", "Hourglass": "Reloj de Arena", "Fish": "Pez", "Bottle": "Botella", "Hole": "Agujero", "Door": "Puerta", "Cook": "Cocinar", "Weapon": "Arma", "Cave": "Cueva", "Campfire": "Hoguera", "Train": "Tren", "Cotton": "Algodón", "Cloth": "Tela", "Clothes": "Ropa", "Statue": "Estatua", "Color": "Color", "Painting": "Pintura", "Book": "Libro", "Library": "Biblioteca", "Comet": "Cometa", "Author": "Autor", "Idea": "Idea", "Copyright": "Derechos de Autor", "Work": "Obra", "Art": "Arte", "Museum": "Museo", "Public Domain": "Dominio Público", "Kitchen": "Cocina", "Restaurant": "Restaurante", "Hotel": "Hotel", "Recipe": "Receta", "Chef": "Chef", "Camera": "Cámara", "Projector": "Proyector", "Film": "Película", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patente", "Creativity": "Creatividad", "God": "Dios", "Cain": "Caín", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cam", "Japheth": "Jafet", "Abraham": "Abraham", "Sarah": "Sara", "Isaac": "Isaac", "Ishmael": "Ismael", "Hagar": "Agar", "Lot": "Lot", "Infinite": "Infinito", "City": "Ciudad", "Sacrifice": "Sacrificio", "Ark": "Arca", "Craft": "Creación", "Infinitecraft": "Infinite Craft", "All": "Todo", "Allcraft": "All Craft", "Dragon": "Dragón", "Cat": "Gato", "Bird": "Pájaro", "Lion": "León", "Tiger": "Tigre", "King": "Rey", "Brazil": "Brasil", "Luis": "Luis", "Leão Brasileiro de Luis": "León Brasileño de Luis", "Quanshian": "Quanshian", "Rebekah": "Rebeca", "Jacob": "Jacob", "Esau": "Esaú", "The Lion King": "El Rey León", "The Lion King II: Simba's Pride": "El Rey León 2", "The Lion King 1½": "El Rey León 3", "The Lion Inside Me": "El León Dentro de Mí"
  },
  "fr": {
    "title": "AllCraft", "tagline": "Combinez des éléments et découvrez!", "discovered_header": "Découvertes", "reset_button": "🔁 Réinitialiser", "alert_new": "✨ Nouvelle découverte:", "alert_not_found": "❌ Aucune combinaison!", "confirm_reset": "Voulez-vous vraiment réinitialiser?",
    "Fire": "Feu", "Water": "Eau", "Earth": "Terre", "Air": "Air", "Steam": "Vapeur", "Lava": "Lave", "Energy": "Énergie", "Mud": "Boue", "Cloud": "Nuage", "Thunderstorm": "Orage", "Dust": "Poussière", "Clay": "Argile", "Ocean": "Océan", "Plant": "Plante", "Smoke": "Fumée", "Tornado": "Tornade", "Sand": "Sable", "Harmattan": "Harmattan", "Sandstorm": "Tempête de Sable", "Tree": "Arbre", "Swamp": "Marais", "Life": "Vie", "Bacteria": "Bactérie", "Seed": "Graine", "Brick": "Brique", "Wall": "Mur", "House": "Maison", "Wave": "Vague", "Metal": "Métal", "Tool": "Outil", "Time": "Temps", "Pressure": "Pression", "Stone": "Pierre", "Bridge": "Pont", "Farm": "Ferme", "Field": "Champ", "Engine": "Moteur", "Wheel": "Roue", "Car": "Voiture", "Robot": "Robot", "Dinosaur": "Dinosaure", "Fossil": "Fossile", "Oil": "Pétrole", "Star": "Étoile", "Rocket": "Fusée", "Space": "Espace", "Mountain": "Montagne", "Island": "Île", "Volcano": "Volcan", "Eruption": "Éruption", "Forest": "Forêt", "Jungle": "Jungle", "Windmill": "Moulin à Vent", "Electricity": "Électricité", "Light": "Lumière", "Wind": "Vent", "Sun": "Soleil", "Moon": "Lune", "Planet": "Planète", "Dune": "Dune", "Eclipse": "Éclipse", "Pottery": "Poterie", "Surf": "Surf", "Geyser": "Geyser", "Tea": "Thé", "Human": "Humain", "Adam": "Adam", "Eve": "Ève", "Glass": "Verre", "Light Bulb": "Ampoule", "Window": "Fenêtre", "Aquarium": "Aquarium", "Hourglass": "Sablier", "Fish": "Poisson", "Bottle": "Bouteille", "Hole": "Trou", "Door": "Porte", "Cook": "Cuisiner", "Weapon": "Arme", "Cave": "Grotte", "Campfire": "Feu de camp", "Train": "Train", "Cotton": "Coton", "Cloth": "Tissu", "Clothes": "Vêtements", "Statue": "Statue", "Color": "Couleur", "Painting": "Peinture", "Book": "Livre", "Library": "Bibliothèque", "Comet": "Comète", "Author": "Auteur", "Idea": "Idée", "Copyright": "Droit d'Auteur", "Work": "Œuvre", "Art": "Art", "Museum": "Musée", "Public Domain": "Domaine Public", "Kitchen": "Cuisine", "Restaurant": "Restaurant", "Hotel": "Hôtel", "Recipe": "Recette", "Chef": "Chef", "Camera": "Caméra", "Projector": "Projecteur", "Film": "Film", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Brevet", "Creativity": "Créativité", "God": "Dieu", "Cain": "Caïn", "Abel": "Abel", "Noah": "Noé", "Shem": "Sem", "Ham": "Cham", "Japheth": "Japhet", "Abraham": "Abraham", "Sarah": "Sarah", "Isaac": "Isaac", "Ishmael": "Ismaël", "Hagar": "Agar", "Lot": "Loth", "Infinite": "Infini", "City": "Ville", "Sacrifice": "Sacrifice", "Ark": "Arche", "Craft": "Création", "Infinitecraft": "Infinite Craft", "All": "Tout", "Allcraft": "All Craft", "Dragon": "Dragon", "Cat": "Chat", "Bird": "Oiseau", "Lion": "Lion", "Tiger": "Tigre", "King": "Roi", "Brazil": "Brésil", "Luis": "Luis", "Leão Brasileiro de Luis": "Lion Brésilien de Luis", "Quanshian": "Quanshian", "Rebekah": "Rébecca", "Jacob": "Jacob", "Esau": "Ésaü", "The Lion King": "Le Roi Lion", "The Lion King II: Simba's Pride": "Le Roi Lion 2", "The Lion King 1½": "Le Roi Lion 3", "The Lion Inside Me": "Le Lion en Moi"
  },
  "ru": {
    "title": "AllCraft", "tagline": "Соединяйте элементы и открывайте новые!", "discovered_header": "Открытия", "reset_button": "🔁 Сброс", "alert_new": "✨ Новое открытие:", "alert_not_found": "❌ Комбинация не найдена!", "confirm_reset": "Вы уверены?",
    "Fire": "Огонь", "Water": "Вода", "Earth": "Земля", "Air": "Воздух", "Steam": "Пар", "Lava": "Лава", "Energy": "Энергия", "Mud": "Грязь", "Cloud": "Облако", "Thunderstorm": "Гроза", "Dust": "Пыль", "Clay": "Глина", "Ocean": "Океан", "Plant": "Растение", "Smoke": "Дым", "Tornado": "Торнадо", "Sand": "Песок", "Harmattan": "Харматтан", "Sandstorm": "Песчаная буря", "Tree": "Дерево", "Swamp": "Болото", "Life": "Жизнь", "Bacteria": "Бактерии", "Seed": "Семена", "Brick": "Кирпич", "Wall": "Стена", "House": "Дом", "Wave": "Волна", "Metal": "Металл", "Tool": "Инструмент", "Time": "Время", "Pressure": "Давление", "Stone": "Камень", "Bridge": "Мост", "Farm": "Ферма", "Field": "Поле", "Engine": "Двигатель", "Wheel": "Колесо", "Car": "Машина", "Robot": "Робот", "Dinosaur": "Динозавр", "Fossil": "Ископаемое", "Oil": "Нефть", "Star": "Звезда", "Rocket": "Ракета", "Space": "Космос", "Mountain": "Гора", "Island": "Остров", "Volcano": "Вулкан", "Eruption": "Извержение", "Forest": "Лес", "Jungle": "Джунгли", "Windmill": "Мельница", "Electricity": "Электричество", "Light": "Свет", "Wind": "Ветер", "Sun": "Солнце", "Moon": "Луна", "Planet": "Планета", "Dune": "Дюна", "Eclipse": "Затмение", "Pottery": "Керамика", "Surf": "Серфинг", "Geyser": "Гейзер", "Tea": "Чай", "Human": "Человек", "Adam": "Адам", "Eve": "Ева", "Glass": "Стекло", "Light Bulb": "Лампочка", "Window": "Окно", "Aquarium": "Аквариум", "Hourglass": "Песочные часы", "Fish": "Рыба", "Bottle": "Бутылка", "Hole": "Дыра", "Door": "Дверь", "Cook": "Готовить", "Weapon": "Оружие", "Cave": "Пещера", "Campfire": "Костер", "Train": "Поезд", "Cotton": "Хлопок", "Cloth": "Ткань", "Clothes": "Одежда", "Statue": "Статуя", "Color": "Цвет", "Painting": "Картина", "Book": "Книга", "Library": "Библиотека", "Comet": "Комета", "Author": "Автор", "Idea": "Идея", "Copyright": "Авторское право", "Work": "Работа", "Art": "Искусство", "Museum": "Музей", "Public Domain": "Общественное достояние", "Kitchen": "Кухня", "Restaurant": "Ресторан", "Hotel": "Отель", "Recipe": "Рецепт", "Chef": "Шеф-повар", "Camera": "Камера", "Projector": "Проектор", "Film": "Фильм", "Hollywood": "Голливуд", "Bollywood": "Болливуд", "Patent": "Патент", "Creativity": "Творчество", "God": "Бог", "Cain": "Каин", "Abel": "Авель", "Noah": "Ной", "Shem": "Сим", "Ham": "Хам", "Japheth": "Иафет", "Abraham": "Авраам", "Sarah": "Сарра", "Isaac": "Исаак", "Ishmael": "Измаил", "Hagar": "Агарь", "Lot": "Лот", "Infinite": "Бесконечность", "City": "Город", "Sacrifice": "Жертва", "Ark": "Ковчег", "Craft": "Ремесло", "Infinitecraft": "Infinite Craft", "All": "Все", "Allcraft": "All Craft", "Dragon": "Дракон", "Cat": "Кот", "Bird": "Птица", "Lion": "Лев", "Tiger": "Тигр", "King": "Король", "Brazil": "Бразилия", "Luis": "Луис", "Leão Brasileiro de Luis": "Бразильский лев Луиса", "Quanshian": "Куаншиан", "Rebekah": "Ревекка", "Jacob": "Иаков", "Esau": "Исав", "The Lion King": "Король Лев", "The Lion King II: Simba's Pride": "Король Лев 2", "The Lion King 1½": "Король Лев 3", "The Lion Inside Me": "Лев внутри меня"
  },
  "hi": {
    "title": "AllCraft", "tagline": "तत्वों को मिलाएं और नए खोजें!", "discovered_header": "खोजे गए", "reset_button": "🔁 रीसेट करें", "alert_new": "✨ नई खोज:", "alert_not_found": "❌ कोई संयोजन नहीं मिला!", "confirm_reset": "क्या आप वाकई रीसेट करना चाहते हैं?",
    "Fire": "आग", "Water": "पानी", "Earth": "पृथ्वी", "Air": "हवा", "Steam": "भाप", "Lava": "लावा", "Energy": "ऊर्जा", "Mud": "कीचड़", "Cloud": "बादल", "Thunderstorm": "तूफान", "Dust": "धूल", "Clay": "मिट्टी", "Ocean": "सागर", "Plant": "पौधा", "Smoke": "धुआं", "Tornado": "बवंडर", "Sand": "रेत", "Harmattan": "हरमट्टन", "Sandstorm": "रेतीला तूफान", "Tree": "पेड़", "Swamp": "दलदल", "Life": "जीवन", "Bacteria": "बैक्टीरिया", "Seed": "बीज", "Brick": "ईंट", "Wall": "दीवार", "House": "घर", "Wave": "लहर", "Metal": "धातु", "Tool": "औजार", "Time": "समय", "Pressure": "दबाव", "Stone": "पत्थर", "Bridge": "पुल", "Farm": "खेत", "Field": "मैदान", "Engine": "इंजन", "Wheel": "पहिया", "Car": "कार", "Robot": "रोबोट", "Dinosaur": "डायनासोर", "Fossil": "जीवाश्म", "Oil": "तेल", "Star": "तारा", "Rocket": "रॉकेट", "Space": "अंतरिक्ष", "Mountain": "पहाड़", "Island": "द्वीप", "Volcano": "ज्वालामुखी", "Eruption": "विस्फोट", "Forest": "जंगल", "Jungle": "वन", "Windmill": "पवन चक्की", "Electricity": "बिजली", "Light": "प्रकाश", "Wind": "हवा", "Sun": "सूरज", "Moon": "चांद", "Planet": "ग्रह", "Dune": "टीला", "Eclipse": "ग्रहण", "Pottery": "मिट्टी के बर्तन", "Surf": "सर्फिंग", "Geyser": "गीजर", "Tea": "चाय", "Human": "इंसान", "Adam": "आदम", "Eve": "हव्वा", "Glass": "कांच", "Light Bulb": "बल्ब", "Window": "खिड़की", "Aquarium": "मछलीघर", "Hourglass": "रेतघड़ी", "Fish": "मछली", "Bottle": "बोतल", "Hole": "छेद", "Door": "दरवाजा", "Cook": "पकाना", "Weapon": "हथियार", "Cave": "गुफा", "Campfire": "अलाव", "Train": "ट्रेन", "Cotton": "कपास", "Cloth": "कपड़ा", "Clothes": "कपड़े", "Statue": "मूर्ति", "Color": "रंग", "Painting": "पेंटिंग", "Book": "किताब", "Library": "पुस्तकालय", "Comet": "धूमकेतु", "Author": "लेखक", "Idea": "विचार", "Copyright": "कॉपीराइट", "Work": "काम", "Art": "कला", "Museum": "संग्रहालय", "Public Domain": "सार्वजनिक डोमेन", "Kitchen": "रसोई", "Restaurant": "रेस्तरां", "Hotel": "होटल", "Recipe": "नुस्खा", "Chef": "शेफ", "Camera": "कैमरा", "Projector": "प्रोजेक्टर", "Film": "फिल्म", "Hollywood": "हॉलीवुड", "Bollywood": "बॉलीवुड", "Patent": "पेटेंट", "Creativity": "रचनात्मकता", "God": "भगवान", "Cain": "कैन", "Abel": "हाबिल", "Noah": "नूह", "Shem": "शेम", "Ham": "हाम", "Japheth": "जाफेथ", "Abraham": "इब्राहीम", "Sarah": "सारा", "Isaac": "इसहाक", "Ishmael": "इस्माइल", "Hagar": "हाजरा", "Lot": "लूत", "Infinite": "अनंत", "City": "शहर", "Sacrifice": "बलिदान", "Ark": "नाव", "Craft": "शिल्प", "Infinitecraft": "Infinite Craft", "All": "सब", "Allcraft": "All Craft", "Dragon": "ड्रैगन", "Cat": "बिल्ली", "Bird": "पक्षी", "Lion": "शेर", "Tiger": "बाघ", "King": "राजा", "Brazil": "ब्राजील", "Luis": "लुइस", "Leão Brasileiro de Luis": "लुइस का ब्राजीलियाई शेर", "Quanshian": "क्वांथियन", "Rebekah": "रिबका", "Jacob": "याकूब", "Esau": "एसाव", "The Lion King": "द लायन किंग", "The Lion King II: Simba's Pride": "द लायन किंग 2", "The Lion King 1½": "द लायन किंग 3", "The Lion Inside Me": "मेरे भीतर का शेर"
  },
  "tr": {
    "title": "AllCraft", "tagline": "Elementleri birleştir ve keşfet!", "discovered_header": "Keşfedilenler", "reset_button": "🔁 Sıfırla", "alert_new": "✨ Yeni keşif:", "alert_not_found": "❌ Kombinasyon yok!", "confirm_reset": "Sıfırlamak istediğinize emin misiniz?",
    "Fire": "Ateş", "Water": "Su", "Earth": "Toprak", "Air": "Hava", "Steam": "Buhar", "Lava": "Lav", "Energy": "Enerji", "Mud": "Çamur", "Cloud": "Bulut", "Thunderstorm": "Gök Gürültülü Fırtına", "Dust": "Toz", "Clay": "Kil", "Ocean": "Okyanus", "Plant": "Bitki", "Smoke": "Duman", "Tornado": "Hortum", "Sand": "Kum", "Harmattan": "Harmattan", "Sandstorm": "Kum Fırtınası", "Tree": "Ağaç", "Swamp": "Bataklık", "Life": "Yaşam", "Bacteria": "Bakteri", "Seed": "Tohum", "Brick": "Tuğla", "Wall": "Duvar", "House": "Ev", "Wave": "Dalga", "Metal": "Metal", "Tool": "Araç", "Time": "Zaman", "Pressure": "Basınç", "Stone": "Taş", "Bridge": "Köprü", "Farm": "Çiftlik", "Field": "Alan", "Engine": "Motor", "Wheel": "Tekerlek", "Car": "Araba", "Robot": "Robot", "Dinosaur": "Dinozor", "Fossil": "Fosil", "Oil": "Petrol", "Star": "Yıldız", "Rocket": "Roket", "Space": "Uzay", "Mountain": "Dağ", "Island": "Ada", "Volcano": "Yanardağ", "Eruption": "Püskürme", "Forest": "Orman", "Jungle": "Vahşi Orman", "Windmill": "Yel Değirmeni", "Electricity": "Elektrik", "Light": "Işık", "Wind": "Rüzgar", "Sun": "Güneş", "Moon": "Ay", "Planet": "Gezegen", "Dune": "Kumul", "Eclipse": "Tutulma", "Pottery": "Çömlekçilik", "Surf": "Sörf", "Geyser": "Gayzer", "Tea": "Çay", "Human": "İnsan", "Adam": "Adem", "Eve": "Havva", "Glass": "Cam", "Light Bulb": "Ampul", "Window": "Pencere", "Aquarium": "Akvaryum", "Hourglass": "Kum Saati", "Fish": "Balık", "Bottle": "Şişe", "Hole": "Delik", "Door": "Kapı", "Cook": "Pişirmek", "Weapon": "Silah", "Cave": "Mağara", "Campfire": "Kamp Ateşi", "Train": "Tren", "Cotton": "Pamuk", "Cloth": "Kumaş", "Clothes": "Giysi", "Statue": "Heykel", "Color": "Renk", "Painting": "Tablo", "Book": "Kitap", "Library": "Kütüphane", "Comet": "Kuyruklu Yıldız", "Author": "Yazar", "Idea": "Fikir", "Copyright": "Telif Hakkı", "Work": "Eser", "Art": "Sanat", "Museum": "Müze", "Public Domain": "Kamu Malı", "Kitchen": "Mutfak", "Restaurant": "Restoran", "Hotel": "Otel", "Recipe": "Tarif", "Chef": "Şef", "Camera": "Kamera", "Projector": "Projektör", "Film": "Film", "Hollywood": "Hollywood", "Bollywood": "Bollywood", "Patent": "Patent", "Creativity": "Yaratıcılık", "God": "Tanrı", "Cain": "Kabil", "Abel": "Habil", "Noah": "Nuh", "Shem": "Sam", "Ham": "Ham", "Japheth": "Yafes", "Abraham": "İbrahim", "Sarah": "Sare", "Isaac": "İshak", "Ishmael": "İsmail", "Hagar": "Hacer", "Lot": "Lut", "Infinite": "Sonsuz", "City": "Şehir", "Sacrifice": "Kurban", "Ark": "Gemi", "Craft": "Zanaat", "Infinitecraft": "Infinite Craft", "All": "Hepsi", "Allcraft": "All Craft", "Dragon": "Ejderha", "Cat": "Kedi", "Bird": "Kuş", "Lion": "Aslan", "Tiger": "Kaplan", "King": "Kral", "Brazil": "Brezilya", "Luis": "Luis", "Leão Brasileiro de Luis": "Luis'in Brezilya Aslanı", "Quanshian": "Quanshian", "Rebekah": "Rebeka", "Jacob": "Yakup", "Esau": "Esav", "The Lion King": "Aslan Kral", "The Lion King II: Simba's Pride": "Aslan Kral 2", "The Lion King 1½": "Aslan Kral 3", "The Lion Inside Me": "İçimdeki Aslan"
  },
  "ar": {
    "title": "AllCraft", "tagline": "اجمع العناصر واكتشف الجديد!", "discovered_header": "المكتشفات", "reset_button": "🔁 إعادة تعيين", "alert_new": "✨ اكتشاف جديد:", "alert_not_found": "❌ لا توجد تركيبة!", "confirm_reset": "هل أنت متأكد من إعادة التعيين؟",
    "Fire": "نار", "Water": "ماء", "Earth": "أرض", "Air": "هواء", "Steam": "بخار", "Lava": "حمم", "Energy": "طاقة", "Mud": "طين", "Cloud": "سحابة", "Thunderstorm": "عاصفة رعدية", "Dust": "غبار", "Clay": "صلصال", "Ocean": "محيط", "Plant": "نبات", "Smoke": "دخان", "Tornado": "إعصار", "Sand": "رمل", "Harmattan": "الهرماتان", "Sandstorm": "عاصفة رملية", "Tree": "شجرة", "Swamp": "مستنقع", "Life": "حياة", "Bacteria": "بكتيريا", "Seed": "بذرة", "Brick": "طوب", "Wall": "جدار", "House": "منزل", "Wave": "موجة", "Metal": "معدن", "Tool": "أداة", "Time": "وقت", "Pressure": "ضغط", "Stone": "حجر", "Bridge": "جسر", "Farm": "مزرعة", "Field": "حقل", "Engine": "محرك", "Wheel": "عجلة", "Car": "سيارة", "Robot": "روبوت", "Dinosaur": "ديناصور", "Fossil": "أحفور", "Oil": "نفط", "Star": "نجم", "Rocket": "صاروخ", "Space": "فضاء", "Mountain": "جبل", "Island": "جزيرة", "Volcano": "بركان", "Eruption": "ثوران", "Forest": "غابة", "Jungle": "أدغال", "Windmill": "طاحونة هوائية", "Electricity": "كهرباء", "Light": "ضوء", "Wind": "ريح", "Sun": "شمس", "Moon": "قمر", "Planet": "كوكب", "Dune": "كثيب", "Eclipse": "كسوف", "Pottery": "فخار", "Surf": "ركوب الأمواج", "Geyser": "ينبوع", "Tea": "شاي", "Human": "إنسان", "Adam": "آدم", "Eve": "حواء", "Glass": "زجاج", "Light Bulb": "مصباح", "Window": "نافذة", "Aquarium": "حوض أسماك", "Hourglass": "ساعة رملية", "Fish": "سمك", "Bottle": "زجاجة", "Hole": "حفرة", "Door": "باب", "Cook": "طبخ", "Weapon": "سلاح", "Cave": "كهف", "Campfire": "نار مخيم", "Train": "قطار", "Cotton": "قطن", "Cloth": "قماش", "Clothes": "ملابس", "Statue": "تمثال", "Color": "لون", "Painting": "لوحة", "Book": "كتاب", "Library": "مكتبة", "Comet": "مذنب", "Author": "مؤلف", "Idea": "فكرة", "Copyright": "حقوق النشر", "Work": "عمل", "Art": "فن", "Museum": "متحف", "Public Domain": "ملكية عامة", "Kitchen": "مطبخ", "Restaurant": "مطعم", "Hotel": "فندق", "Recipe": "وصفة", "Chef": "طباخ", "Camera": "كاميرا", "Projector": "جهاز عرض", "Film": "فيلم", "Hollywood": "هوليوود", "Bollywood": "بوليوود", "Patent": "براءة اختراع", "Creativity": "إبداع", "God": "الله", "Cain": "قابيل", "Abel": "هابيل", "Noah": "نوح", "Shem": "سام", "Ham": "حام", "Japheth": "يافث", "Abraham": "إبراهيم", "Sarah": "سارة", "Isaac": "إسحاق", "Ishmael": "إسماعيل", "Hagar": "هاجر", "Lot": "لوط", "Infinite": "لانهائي", "City": "مدينة", "Sacrifice": "تضحية", "Ark": "فلك", "Craft": "حرفة", "Infinitecraft": "Infinite Craft", "All": "الكل", "Allcraft": "All Craft", "Dragon": "تنين", "Cat": "قطة", "Bird": "طائر", "Lion": "أسد", "Tiger": "نمر", "King": "ملك", "Brazil": "البرازيل", "Luis": "لويس", "Leão Brasileiro de Luis": "أسد لويس البرازيلي", "Quanshian": "كوانشيان", "Rebekah": "رفقة", "Jacob": "يعقوب", "Esau": "عيسو", "The Lion King": "الأسد الملك", "The Lion King II: Simba's Pride": "الأسد الملك 2", "The Lion King 1½": "الأسد الملك 3", "The Lion Inside Me": "الأسد الذي بداخلي"
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