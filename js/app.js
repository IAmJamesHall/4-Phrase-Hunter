/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


const phrases = [
    "Hello",
    "Goodbye",
    "If it rains, it pours"
]

function createPhraseObjects(phrases) {
    const phraseObjects = [];
    for (phrase of phrases) {
        phrase = phrase.toLowerCase()
        .replace(/[^a-z]/g, ' ')
        .replace(/[ ]{2,}/g, ' ');

        phraseObjects.push(new Phrase(phrase));
        console.log(phrase);
    }
    return phraseObjects;
}


const startGame = document.querySelector('#btn__start');
const nextRound = document.querySelector('#btn__next');
nextRound.style.display = 'none';
startGame.addEventListener('click', () => {
    const game = new Game(createPhraseObjects(phrases));
    game.startGame();

    const keyboard = document.querySelector('#qwerty');
    keyboard.addEventListener('click', (event) => {
        if (event.target.className === "key") {
            game.handleInteraction(event.target);
        }
    })

    nextRound.addEventListener('click', () => {
        game.startRound();
    })

})



