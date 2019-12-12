/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor (phrases) {
        this.phrases = phrases;
        this.activePhrase = null;
        this.currentRound = 1;
        this.roundsPerGame = 3;
        this.wins = 0;
        this.losses = 0;
        this._overlay = "hide";
    }

    /** 
     * toggles visibility on overlay div
     * @param {string} showOrHide - "show" or "hide" overlay
     */
    set overlay(showOrHide) {
        if (showOrHide === "hide") {
            this._overlay = "hide";

            //Hide overlay
            const overlay = document.querySelector('#overlay');
            overlay.style.display = 'none';

            //Initialize keyboard
            const keys = document.querySelectorAll('.key');
            for (let key of keys) {
                key.classList = "key";
                key.removeAttribute('disabled');
            }

            //Initialize lives
            const lives = document.querySelectorAll('.tries');
            for (let life of lives) {
                life.classList = 'tries';
                life.firstElementChild.src = 'images/liveHeart.png';
            }

            //Initialize phrase
            this.activePhrase = this.getRandomPhrase();
            this.activePhrase.addPhraseToDisplay();

            //Show current round number
            const round = document.querySelector('.round');
            round.innerText = `Round ${this.currentRound}`;
        } else if (showOrHide === "show") {
            this._overlay = "show";
            const overlayDiv = document.querySelector('#overlay');
            const overlayText = document.querySelector('#game-over-message');
            const overlayNextButton = document.querySelector('#btn__next');
            const overlayStartButton = document.querySelector('#btn__start');
            if (this.currentRound < this.roundsPerGame) { //show round totals
                //TODO: add won/lose functionality
                if (true) {
                    overlayDiv.classList.add = "win";
                } else {
                    overlayDiv.classList.add = "lose";
                }
                overlayText.innerHTML = `${this.wins} wins, ${this.losses} losses`;

                overlayDiv.style.display = '';
                overlayNextButton.style.display = '';
                overlayStartButton.style.display = 'none';
                this.currentRound += 1;
                overlayNextButton.innerText = `Continue to Round ${this.currentRound}`;
            } else {
                overlayStartButton.innerText = "Restart";
        let finishText = '';
        if (this.wins > this.losses) { //show game results
            finishText = "Congratulations on your win!";
            overlayDiv.classList.add = "win";
        } else if (this.wins < this.losses) {
            finishText = "Uh oh. Looks like you lost this one";
            overlayDiv.classList.add = "lose";
        } else {
            finishText = "Here are your results:"
        }
        overlayText.innerText = `${finishText} (${this.wins} wins, ${this.losses} losses)`;
        overlayNextButton.style.display = 'none';
        overlayStartButton.style.display = '';
        overlayDiv.style.display = '';
            } 
        }
    }

    get overlay () {
        return this._overlay;
    }

 

    getRandomPhrase() {
        const numberOfPhrases = this.phrases.length;
        const phraseNumber = Math.floor(Math.random()*numberOfPhrases);
        return this.phrases[phraseNumber];
    }

    handleInteraction(char) {
        let key = document.querySelector('#' + char);
        key.setAttribute('disabled', 'true');
        const matchedLetter = this.activePhrase.checkForLetter(key.innerText);
        if (matchedLetter) {
            key.className = 'chosen key';
            this.activePhrase.showMatchedLetter(key.innerText);
            if (this.checkForWin()) {
                this.wins += 1;
                this.overlay = "show";
            }
        } else {
            key.className = 'wrong key';
            this.removeLife();
        }
    }
    /**
     * removes one life and checks if all lives are gone
     */
    removeLife() {
        const liveHearts = document.querySelectorAll('.tries:not(.dead)');
        if (liveHearts.length > 1) {
            const dyingHeart = liveHearts[0];
            dyingHeart.firstElementChild.src = 'images/lostHeart.png';
            dyingHeart.classList.add('dead');
        } else {
            this.losses += 1;
            this.overlay = "show";
        }
    }

    resetLives() {
        const liveHearts = document.querySelectorAll('.tries');
        for (let heart of liveHearts) {
            heart.classList = "tries";
            heart.firstElementChild.src = 'images/liveHeart.png';
        }
    }

    checkForWin() {
        const hiddenLetters = document.querySelectorAll('.hide');
        return hiddenLetters.length === 0;
    }
}