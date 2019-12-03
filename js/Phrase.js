/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    addPhraseToDisplay() {
        const ul = document.createElement('ul');

        for (letter of this.phrase) {
            if (letter === ' ') {
                const li = document.createElement('li');
                li.className = "space";
                li.textContent = " ";
            } else {
                const li = document.createElement('li');
                li.classList = `hide letter ${letter}`;
                li.textContent = letter;
            }
            ul.appendChild(li);
        }


    }
}