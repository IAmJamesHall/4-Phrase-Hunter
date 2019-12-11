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
    }




    showRoundResults(won) {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const overlayNextButton = document.querySelector('#btn__next');
        const overlayStartButton = document.querySelector('#btn__start');
        if (this.currentRound >= this.roundsPerGame) {
            this.showGameResults();
        } else {
            if (won) {
                overlayDiv.classList.add = "win";
            } else {
                overlayDiv.classList.add = "lose";
            }
            overlayText.innerText = `${this.wins} wins, ${this.losses} loses; ${this.roundsPerGame - this.currentRound} rounds left`;

            overlayDiv.style.display = '';
            overlayNextButton.style.display = '';
            overlayStartButton.style.display = 'none';
            this.currentRound += 1;
            overlayNextButton.innerText = `Continue to Round ${this.currentRound}`;
        }
    }


    showGameResults() {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const overlayStartButton = document.querySelector('#btn__start');
        const overlayNextButton = document.querySelector('#btn__next');
        overlayStartButton.innerText = "Restart";
        let finishText = '';
        if (this.wins > this.losses) {
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

    /**
     * hide results overlay, reset all of the round's elements
     */
    prepareForNextRound() {
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
                this.showRoundResults(true);
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
            this.showRoundResults(false);
        }
    }

    checkForWin() {
        const hiddenLetters = document.querySelectorAll('.hide');
        return hiddenLetters.length === 0;
    }
}