/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */



//  const phrases = [
//     "Hello",
//     "Goodbye",
//     "When it rains, it pours",
//     "It is raining cats and dogs",
//     "The pot calling the kettle black",
//     "Good morning",
//     "Where there is a will, there is a way",
//     "A dime a dozen",
//     "A piece of cake",
//     "Beating around the bush",
//     "Barking up the wrong tree",
//     "An Arm and a leg",
//     "A fool and his money are soon parted"
// ];

const phrases = [
    "Hello",
    "Goodbye",
    "When it rains, it pours"];


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


//initialize the game and set up keyboard/button event listeners
const game = new Game(createPhraseObjects(phrases));
game.handleKeyboard();
game.handleControlButton();