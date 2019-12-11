/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor (phrases) {
        this.phrases = phrases;
        this.activePhrase = null;
        this.currentRound = 1;
        this.roundsPerPage = 3;
        this.wins = 1;
        this.loses = 0;
    }

    startGame() {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        this.startRound();
    }

    startRound() {
        if (this.currentRound <= 3) {
            const overlay = document.querySelector('#overlay');
            overlay.style.display = 'none';
            this.resetRound();
            this.activePhrase = this.getRandomPhrase();
            this.activePhrase.addPhraseToDisplay();
            const round = document.querySelector('.round');
            round.innerText = `Round ${this.currentRound}`;
        } else {
            this.gameOver();
        }
        
    }

    resetRound() {
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
            life.setAttribute('src', 'images/liveHeart.png');
        }
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
            key.className = 'chosen key';
            this.activePhrase.showMatchedLetter(key.innerText);
            if (this.checkForWin()) {
                this.roundOver(true);
            }
        } else {
            key.className = 'wrong key';
            this.removeLife();
        }
    }

    removeLife() {
        const liveHearts = document.querySelectorAll('.tries:not(.dead)');
        if (liveHearts.length > 1) {
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

    roundOver(won) {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const overlayNextButton = document.querySelector('#btn__next');
        const overlayStartButton = document.querySelector('#btn__start');
        if (this.currentRound > 3) {
            this.gameOver(true);
        } else {
            if (won) {
                overlayText.innerText = "Nice job!";
                overlayDiv.classList.add = "win";
            } else {
                overlayText.innerText = `Didn't do so well. You have ${this.roundsPerPage - this.currentRound} more rounds`
                overlayDiv.classList.add = "lose";
            }
            
            overlayDiv.style.display = '';
            overlayNextButton.style.display = '';
            overlayStartButton.style.display = 'none';
            this.currentRound += 1;
            overlayNextButton.innerText = `Continue to Round ${this.currentRound}`;
        }
    }

    gameOver() {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const overlayStartButton = document.querySelector('#btn__start');
        const overlayNextButton = document.querySelector('#btn__next');
        overlayStartButton.innerText = "Restart";
        if (this.wins > this.loses) {
            const finishText = "Congratulations on your win!";
            overlayDiv.classList.add = "win";
        } else {
            const finishText = "Uh oh. Looks like you lost this one";
            overlayDiv.classList.add = "lose";
        }
        overlayText.innerText = `${this.finishText} (${this.wins} wins, ${this.loses} losses})`;
        overlayNextButton.style.display = 'none';
        overlayDiv.style.display = '';
    }

}