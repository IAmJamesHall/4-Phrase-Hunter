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


const startGameButton = document.querySelector('#btn__start');
const nextRoundButton = document.querySelector('#btn__next');
nextRoundButton.style.display = 'none';
startGameButton.addEventListener('click', startGame);
window.addEventListener('keypress', (e) => {
    if (e.which == 13) {
        startGame();
    }
});




function startGame() {
    window.removeEventListener('keypress', (e) => {
        if (e.which == 13) {
            startGame();
        }
    });
    const game = new Game(createPhraseObjects(phrases));
    game.prepareForNextRound();

    //hide the rules
    const rules = document.querySelector('#rules');
    rules.style.display = 'none';
    const keyboard = document.querySelector('#qwerty');
    keyboard.addEventListener('click', (event) => {
        if (event.target.className === "key") {
            game.handleInteraction(event.target.innerText);
        }
    })

    nextRoundButton.addEventListener('click', () => {
        game.prepareForNextRound();
    })

    window.addEventListener('keypress', (e) => {
        let charString = String.fromCharCode(e.which);
        game.handleInteraction(charString);

    })


}



