/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


 /** 
  * TODO:
  * - add colors
  *     - add win/lose colors
 */


class Game {
    constructor (phrases) {
        this.phrases = phrases;
        this.activePhrase = null;
        this.currentRound = 1;
        this.roundsPerGame = 3;
        this.wins = 0;
        this.losses = 0;
        this.usedPhrases = [];
    }

    

    showResults(win) {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const controlButton = document.querySelector('#control-button');
       this.currentRound += 1;

        let text = ''
        
        //if game is over
        if (this.currentRound >= this.roundsPerGame) { 
            if (this.wins > this.losses) {
                text = "Congratulations on your win!<br>";
                overlayDiv.classList.add('win');
            } else if (this.wins < this.losses) {
                text = "Uh oh. Looks like you lost this one";
                overlayDiv.classList.add('lose');
            } else {
                text = "Here are your results:"
            }
            controlButton.innerText = 'Restart';
        } else { //round is over
            if (win) {
                overlayDiv.classList.add('win');
            } else {
                overlayDiv.classList.add('lose');
            }
            controlButton.innerHTML = `Continue to Round ${this.currentRound}`;
        }
        
        overlayText.innerHTML = `${text} (${this.wins} wins, ${this.losses} losses)`;
        overlayDiv.style.display = '';
    }


    /**
     * hide results overlay, reset all of the round's elements
     */
    prepareForNextRound() {
        //Hide overlay
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        overlay.classList = "start";

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


    handleKeyboard() {
        window.addEventListener('keypress', (e) => {
            //find screen state
            if (this.checkForOverlay()) {
                const buttons = document.querySelectorAll('#overlay button');
                for (let button of buttons) {
                    if (button.style.display != "none") {
                        button.click();
                    }
                }
            } else {
                let charString = String.fromCharCode(e.which);
                if (charString.match(/[a-z]/)) {
                    this.handleInteraction(charString);
                }
            }
            
        })
    }

    /**
     * adds event listener and function logic to control button
     */
    handleControlButton() {
        const controlButton = document.querySelector('#control-button');
        controlButton.addEventListener('click', () => {

            if (this.currentRound === 1) { //game hasn't begun
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
                })
            } else if (this.currentRound > this.roundsPerGame) {
                location.reload();
            } else {
                game.prepareForNextRound();
            }
        });
    }



    getRandomPhrase() {
        const numberOfPhrases = this.phrases.length;
        const phraseNumber = Math.floor(Math.random()*numberOfPhrases);
        let phrase = this.phrases[phraseNumber];
        if (this.usedPhrases.includes(phrase)) {
            phrase = this.getRandomPhrase();
        }
        this.usedPhrases.push(phrase);
        return phrase;
    }

    handleInteraction(char) {
        if (this.checkForOverlay() === false) {
            let key = document.querySelector('#' + char);
            key.setAttribute('disabled', 'true');
            const matchedLetter = this.activePhrase.checkForLetter(key.innerText);
            if (matchedLetter) {
                key.className = 'chosen key';
                this.activePhrase.showMatchedLetter(key.innerText);
                if (this.checkForWin()) {
                    this.wins += 1;
                    this.showResults(true);
                }
            } else {
                key.className = 'wrong key';
                this.removeLife();
            }
        } else {
            if (this.checkForEnter(char) === true) {
                this.prepareForNextRound();
            }
            
        }
    }


    checkForOverlay() {
        const overlay = document.querySelector('#overlay');
        return overlay.style.display != "none";
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
            this.showResults(false);
        }
    }

    checkForWin() {
        const hiddenLetters = document.querySelectorAll('.hide');
        return hiddenLetters.length === 0;
    }
}