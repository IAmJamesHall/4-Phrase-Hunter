/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


const phrases = [
    "Hello",
    "Goodbye",
    "When it rains, it pours",
    "hi"
]
const phrasesCopy = [
    "Hello",
    "Goodbye",
    "When it rains, it pours",
    "It is raining cats and dogs",
    "The pot calling the kettle black",
    "Good morning",
    "Where there is a will, there is a way",
    "A dime a dozen",
    "A piece of cake",
    "Beating around the bush",
    "Barking up the wrong tree",
    "An Arm and a leg",
    "A fool and his money are soon parted"
]

/**
 * returns an array of Phrase objects
 * @param {array} phrases - array of phrases
 * @returns {array} array of phrase objects
 */
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
const game = new Game(createPhraseObjects(phrases));
game.handleKeyboard();
startGame.addEventListener('click', () => {   
    game.prepareForNextRound();

    //hide the rules
    const rules = document.querySelector('#rules');
    rules.style.display = 'none';

    //onscreen keyboard 
    const keyboard = document.querySelector('#qwerty');
    keyboard.addEventListener('click', (event) => {
        if (event.target.className === "key") {
            game.handleInteraction(event.target.innerText);
        }
    });

    nextRound.addEventListener('click', () => {
        game.prepareForNextRound();
    })

    

})



