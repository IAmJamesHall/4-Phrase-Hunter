/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor (phrases) {
        this.dead = false;
        this.phrases = phrases;
        this.activePhrase = null;
    }

    startGame() {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';

        this.activePhrase = getRandomPhrase();

        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        const numberOfPhrases = this.phrases.length;
        const phraseNumber = Math.floor(Math.random()*numberOfPhrases);
        return this.phrases[phraseNumber];
    }

    handleInteraction(key) {
        key.setAttribute('disabled', 'true');
        const matchedLetter = this.activePhrase.checkForLetter(key.innerText);
        if (matchedLetter) {
            key.addClass.add('chosen');
            this.phrase.showMatchedLetter();
            if (this.checkForWin()) {
                this.gameOver();
            }
        } else {
            key.classList.add('wrong');
            this.removeLife();
        }
    }

    removeLife() {
        const liveHearts = document.querySelectorAll('.tries:not(.dead)');
        if (liveHearts.length > 0) {
            const dyingHeart = liveHearts[0];
            dyingHeart.firstElementChild.setAttribute('src', 'images/lostHeart.png');
            dyingHeart.classList.add('dead');
        } else {
            this.dead = true;
            this.gameOver();
        }
    }

    checkForWin() {
        const hiddenLetters = document.querySelectorAll('.hide');
        return hiddenLetters.length === 0;
    }

    gameOver(won) {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = overlayDiv.firstElementChild;
        if (won) {
            overlayText.innerText = "Congratulations on your win!";
            overlayDiv.classList.add = "win";
        } else {
            overlayText.innerText = "Uh oh. Looks like you lost this one. Try again!"
            overlayDiv.classList.add = "lose";
        }
        overlayDiv.style.display = none;
    }

}