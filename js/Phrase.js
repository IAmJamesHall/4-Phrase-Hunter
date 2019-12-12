/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    /**
     * adds this.phrase to display
     */
    addPhraseToDisplay() {
        const ul = document.createElement('ul');
        const div = document.querySelector('#phrase');
        const phraseArray = this.phrase.split('');

        for (let letter of phraseArray) {
            const li = document.createElement('li');
            if (letter === ' ') {
                li.className = "space";
                li.textContent = " ";
            } else {
                li.classList = `hide letter ${letter}`;
                li.textContent = letter;
            }
            ul.appendChild(li);
        }

        div.innerHTML = "";
        div.appendChild(ul);
    }

    /**
     * checks for character in phrase
     * @param {string} letterToCheck - string character to look for in phrase
     */
    checkForLetter(letterToCheck) {
        for (let letter of this.phrase) {
            if (letterToCheck === letter) {
                return true;
            };
        }
        return false;
    }

    /**
     * 
     * @param {string} letter - shows all instances of letter in phrase
     */
    showMatchedLetter(letter) {
        const letterElements = document.querySelectorAll(`.${letter}`);
        for (let element of letterElements) {
            element.classList = `show letter ${letter}`;
        }
    }
}