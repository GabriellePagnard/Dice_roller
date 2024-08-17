// app.js

// Variables pour les éléments du DOM
const diceCountInput = document.getElementById('dice-count');
const diceCountValue = document.getElementById('dice-count-value');
const rollButton = document.getElementById('roll-button');
const replayButton = document.getElementById('replay-button');
const diceGrid = document.getElementById('dice-grid');

// Mettre à jour l'affichage du nombre de dés
diceCountInput.addEventListener('input', function () {
    diceCountValue.textContent = this.value;
});

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
        dots.innerHTML = '<div class="dot dot2"></div><div class="dot dot5"></div>';
    } else if (result === 3) {
        dots.innerHTML = '<div class="dot dot2"></div><div class="dot dot1"></div><div class="dot dot5"></div>';
    } else if (result === 4) {
        dots.innerHTML = '<div class="dot dot2"></div><div class="dot dot3"></div><div class="dot dot4"></div><div class="dot dot5"></div>';
    } else if (result === 5) {
        dots.innerHTML = '<div class="dot dot2"></div><div class="dot dot3"></div><div class="dot dot4"></div><div class="dot dot5"></div><div class="dot dot1"></div>';
    } else if (result === 6) {
        dots.innerHTML = `
            <div class="dot dot6-row1-left"></div>
            <div class="dot dot6-row1-right"></div>
            <div class="dot dot6-row2-left"></div>
            <div class="dot dot6-row2-right"></div>
            <div class="dot dot6-left"></div>
            <div class="dot dot6-right"></div>
        `;
    }

    return dots;
}

// Fonction pour lancer tous les dés
function rollAllDice() {
    const numberOfDice = parseInt(diceCountInput.value) || 1;
    diceGrid.innerHTML = ''; // Réinitialiser le conteneur

    const diceElements = [];
    for (let i = 0; i < numberOfDice; i++) {
        const result = rollDice();
        const diceElement = createDiceDots(result);
        diceGrid.appendChild(diceElement);
        diceElements.push(diceElement);
    }

    animateDice(diceElements);
    replayButton.classList.remove('hidden');
}

// Fonction pour animer les dés
function animateDice(diceElements) {
    diceElements.forEach(dice => {
        dice.classList.add('animate');
        setTimeout(() => dice.classList.remove('animate'), 500);
    });
}

// Gérer le clic sur le bouton "Lancer les dés"
rollButton.addEventListener('click', rollAllDice);

// Gérer le clic sur le bouton "Relancer"
replayButton.addEventListener('click', rollAllDice);
