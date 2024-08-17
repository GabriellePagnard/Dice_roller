// Variables pour les éléments du DOM
const diceCountInput = document.getElementById('dice-count');
const diceCountValue = document.getElementById('dice-count-value');
const rollButton = document.getElementById('roll-button');
const replayButton = document.getElementById('replay-button');
const diceContainer = document.getElementById('dice-grid');

let gameStarted = false; // Variable pour suivre l'état du jeu
let currentDiceCount = 1; // Variable pour mémoriser le nombre de dés sélectionnés

// Mettre à jour l'affichage du nombre de dés sélectionnés
diceCountInput.addEventListener('input', () => {
    diceCountValue.textContent = diceCountInput.value;
    updateSliderBackground();
});

function updateSliderBackground() {
    const percentage = (diceCountInput.value - diceCountInput.min) / (diceCountInput.max - diceCountInput.min) * 100;
    diceCountInput.style.background = `linear-gradient(to right, #6EC1E4 ${percentage}%, #F8BBD0 ${percentage}%)`;
}

// Fonction pour générer un nombre aléatoire entre 1 et 6
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Fonction pour créer les éléments de points d'un dé en fonction du résultat
function createDiceDots(result) {
    const dots = document.createElement('div');
    dots.className = 'dice';

    if (result === 1) {
        dots.innerHTML = '<div class="dot dot1"></div>';
    } else if (result === 2) {
        dots.innerHTML = `
            <div class="dot dot2"></div>
            <div class="dot dot5"></div>
        `;
    } else if (result === 3) {
        dots.innerHTML = `
            <div class="dot dot2"></div>
            <div class="dot dot1"></div>
            <div class="dot dot5"></div>
        `;
    } else if (result === 4) {
        dots.innerHTML = `
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
            <div class="dot dot5"></div>
        `;
    } else if (result === 5) {
        dots.innerHTML = `
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
            <div class="dot dot5"></div>
            <div class="dot dot1"></div>
        `;
    } else if (result === 6) {
        dots.innerHTML = `
            <div class="dot dot6-row1-left"></div>
            <div class="dot dot6-row1-right"></div>
            <div class="dot dot6-left"></div>
            <div class="dot dot6-right"></div>
            <div class="dot dot6-row2-left"></div>
            <div class="dot dot6-row2-right"></div>
        `;
    }

    return dots;
}

// Fonction pour lancer tous les dés
function rollAllDice() {
    if (!gameStarted) {
        // Première phase : choisir le nombre de dés
        currentDiceCount = parseInt(diceCountInput.value) || 1;
        diceCountInput.disabled = true; // Bloquer le curseur une fois les dés lancés
        replayButton.classList.remove('hidden');
        gameStarted = true;
    } else {
        // Phase de relance : relancer les dés avec le nombre sélectionné
        rollDiceAnimation(currentDiceCount);
    }
}

// Fonction pour animer et lancer les dés
function rollDiceAnimation(numberOfDice) {
    diceContainer.innerHTML = ''; // Réinitialiser le conteneur

    const diceElements = [];
    for (let i = 0; i < numberOfDice; i++) {
        const result = rollDice();
        const diceElement = createDiceDots(result);
        diceContainer.appendChild(diceElement);
        diceElements.push(diceElement);
    }

    animateDice(diceElements);
}

// Fonction pour animer les dés
function animateDice(diceElements) {
    diceElements.forEach(dice => {
        dice.classList.add('animate');
        setTimeout(() => dice.classList.remove('animate'), 500);
    });
}

// Fonction pour réinitialiser le jeu et retourner à l'écran de sélection
function resetGame() {
    gameStarted = false;
    diceCountInput.disabled = false;
    diceContainer.innerHTML = '';
    rollButton.textContent = 'Nouveau Lancer'; // Modifie le texte pour "Nouveau Lancer"
    replayButton.classList.add('hidden');
}

// Gérer le clic sur le bouton "Nouveau Lancer"
rollButton.addEventListener('click', () => {
    if (gameStarted) {
        resetGame(); // Retourner à l'écran de sélection
    } else {
        rollAllDice(); // Lancer les dés
        rollDiceAnimation(currentDiceCount);
    }
});

// Gérer le clic sur le bouton "Relancer"
replayButton.addEventListener('click', () => {
    rollDiceAnimation(currentDiceCount); // Relancer les dés sans changer leur nombre
});
