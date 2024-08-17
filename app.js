// Variables pour les éléments du DOM
const diceCountInput = document.getElementById('dice-count');
const rollButton = document.getElementById('roll-button');
const replayButton = document.getElementById('replay-button');
const diceContainer = document.getElementById('dice-container');

// Fonction pour générer un nombre aléatoire entre 1 et 6
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Fonction pour créer un élément de dé
function createDiceElement(result) {
    const dice = document.createElement('div');
    dice.className = 'dice';
    dice.innerHTML = `<span class="dice-result">${result}</span>`;
    return dice;
}

// Fonction pour animer le lancer de dés
function animateDice(diceElements) {
    diceElements.forEach(dice => {
        dice.classList.add('animate');
        setTimeout(() => dice.classList.remove('animate'), 500);
    });
}

// Fonction pour lancer les dés
function rollAllDice() {
    const numberOfDice = parseInt(diceCountInput.value) || 1;
    diceContainer.innerHTML = ''; // Réinitialiser le conteneur

    const diceElements = [];
    for (let i = 0; i < numberOfDice; i++) {
        const result = rollDice();
        const diceElement = createDiceElement(result);
        diceContainer.appendChild(diceElement);
        diceElements.push(diceElement);
    }

    animateDice(diceElements);
    replayButton.classList.remove('hidden');
}

// Gérer le clic sur le bouton "Lancer les dés"
rollButton.addEventListener('click', rollAllDice);

// Gérer le clic sur le bouton "Relancer"
replayButton.addEventListener('click', rollAllDice);
