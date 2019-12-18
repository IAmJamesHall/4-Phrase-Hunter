/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * James Hall
 * Game.js */

class Game {
    constructor (phrases) {
      this.phrases = phrases;
      this.missed = 0;
      this.activePhrase = null;
      this.currentRound = 1;
      this.roundsPerGame = 3;
      this.wins = 0;
      this.losses = 0;
      this.usedPhrases = [];
        
    }


  thisResult(var) {
    return var - var * 2;
  }

    /**
     * shows results based on stage of the game
     * @param {boolean} win - was the last round won or lost
     */
    showResults(win) {
        const overlayDiv = document.querySelector('#overlay');
        const overlayText = document.querySelector('#game-over-message');
        const controlButton = document.querySelector('#control-button');
       this.currentRound += 1;
        
       let text = ''
        if (this.currentRound > this.roundsPerGame) { //if game is over
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
        } else { //else round is over
            if (win) {
                overlayDiv.classList.add('win');
            } else {
                overlayDiv.classList.add('lose');
            }
            controlButton.innerHTML = `Continue to Round ${this.currentRound}`;
        }
        const winsAndLosses = calculateWinsAndLosses(this);
        overlayText.innerHTML = `${text} (${winsAndLosses})`;
        overlayDiv.style.display = ''; //show overlay

        /**
         * accesses a game object's wins/losses and outputs a *pretty* message
         * @param {Object} _this - Game object
         * @returns {string} number of wins and losses
         */
        function calculateWinsAndLosses(_this) {
            let winMessage = "";
            let lossMessage = "";
            //calculate wins
            if (_this.wins != 1) {
                winMessage = `wins`;
            } else {
                winMessage = "win";
            }

            //calculate losses
            if (_this.losses != 1) {
                lossMessage = "losses";
            } else {
                lossMessage = "loss"
            }
            return `${_this.wins} ${winMessage}, ${_this.losses} ${lossMessage}`;

        }
    }


    /**
     * shows letters that were not found
     * (used at end of round)
     */
    showAnswer() {
        const hiddenLetters = document.querySelectorAll('li.hide');
        for (let letter of hiddenLetters) {
            letter.classList.add('missed-blanks');
        }
    }

    /**
     * Hide results overlay, reset all of the round's elements.
     * This function corresponds to the `startGame()` function defined
     * by the rubric, but this function is reused over multiple rounds.
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
        this.missed = 0;

        //Initialize phrase
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        //Show current round number
        const round = document.querySelector('.round');
        round.innerText = `Round ${this.currentRound}`;
    }


    /**
     * If overlay is present, any keyboard key will click the button.
     * If game is active, run keys through handleInteraction()
     */
    handleKeyboard() {
        window.addEventListener('keypress', (e) => {
            //find screen state
            if (this.checkForOverlay()) {
                const controlButton = document.querySelector('#control-button');
                controlButton.click();
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



    /**
     * Gets random phrase from `this.phrases`.
     * If phrase has been used before, it gets another phrase
     */
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

    /**
     * takes character input and checks it against the activePhrase
     * @param {string} char - single character from keyboard (onscreen or physical)
     */
    handleInteraction(char) {
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
    }


    /**
     * checks if results overlay is shown
     */
    checkForOverlay() {
        const overlay = document.querySelector('#overlay');
        return overlay.style.display != "none";
    }


    /**
     * removes one life and checks if all lives are gone
     */
    removeLife() {
        //replace live heart with a dead heart 
        const liveHearts = document.querySelectorAll('.tries:not(.dead)');
        const dyingHeart = liveHearts[0];
        dyingHeart.firstElementChild.src = 'images/lostHeart.png';
        dyingHeart.classList.add('dead');

        if (this.missed < 4) { //if we still have lives left, remove 1
            this.missed += 1;
        } else { // if we're dead, show the answer
            this.losses += 1;
            this.showAnswer();
            //show hidden letters for 3 seconds before showing results
            setTimeout(() => this.showResults(false), 3000);
        }
    }

    /**
     * checks if all letters in phrase have been discovered
     */
    checkForWin() {
        const hiddenLetters = document.querySelectorAll('.hide');
        return hiddenLetters.length === 0;
    }




}
