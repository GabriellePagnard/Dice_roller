// Variables pour les éléments du DOM
const diceCountInput = document.getElementById('dice-count');
const diceCountValue = document.getElementById('dice-count-value');
const rollButton = document.getElementById('roll-button');
const replayButton = document.getElementById('replay-button');
const diceContainer = document.getElementById('dice-grid');

let gameStarted = false; // Suivi de l'état du jeu
let currentDiceCount = 1; // Nombre de dés sélectionnés

/**
 * Met à jour l'affichage du nombre de dés sélectionnés et la couleur du curseur.
 */
diceCountInput.addEventListener('input', () => {
    diceCountValue.textContent = diceCountInput.value;
    updateSliderBackground();
});

/**
 * Met à jour le fond du curseur pour montrer une jauge colorée.
 */
function updateSliderBackground() {
    const percentage = (diceCountInput.value - diceCountInput.min) / (diceCountInput.max - diceCountInput.min) * 100;
    diceCountInput.style.background = `linear-gradient(to right, #6EC1E4 ${percentage}%, #F8BBD0 ${percentage}%)`;
}

/**
 * Génère un nombre aléatoire entre 1 et 6.
 * @returns {number} Le résultat du dé.
 */
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

/**
 * Crée les éléments visuels représentant les points sur un dé.
 * @param {number} result - Le résultat du dé (1 à 6).
 * @returns {HTMLElement} Un élément HTML représentant le dé.
 */
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

/**
 * Lance tous les dés en fonction du nombre sélectionné.
 */
function rollAllDice() {
    if (!gameStarted) {
        currentDiceCount = parseInt(diceCountInput.value) || 1;
        diceCountInput.disabled = true; // Désactiver le curseur
        replayButton.classList.remove('hidden');
        gameStarted = true;
    } else {
        rollDiceAnimation(currentDiceCount);
    }
}

/**
 * Anime le lancer des dés.
 * @param {number} numberOfDice - Nombre de dés à lancer.
 */
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

/**
 * Applique une animation de rotation aux dés.
 * @param {HTMLElement[]} diceElements - Liste des éléments de dés à animer.
 */
function animateDice(diceElements) {
    diceElements.forEach(dice => {
        dice.classList.add('animate');
        setTimeout(() => dice.classList.remove('animate'), 500);
    });
}

/**
 * Réinitialise le jeu pour retourner à l'écran de sélection du nombre de dés.
 */
function resetGame() {
    gameStarted = false;
    diceCountInput.disabled = false;
    diceContainer.innerHTML = '';
    rollButton.textContent = 'Nouveau Lancer';
    replayButton.classList.add('hidden');
}

// Gère le clic sur le bouton "Nouveau Lancer"
rollButton.addEventListener('click', () => {
    if (gameStarted) {
        resetGame();
    } else {
        rollAllDice();
        rollDiceAnimation(currentDiceCount);
    }
});

// Gère le clic sur le bouton "Relancer"
replayButton.addEventListener('click', () => {
    rollDiceAnimation(currentDiceCount);
});
