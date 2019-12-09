/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startGame = document.querySelector('#btn__reset');
startGame.addEventListener('click', () => {
    const game = new Game;

    const keyboard = document.querySelector('#qwerty');
    keyboard.addEventListener('click', (event) => {
        if (event.target.className === "key") {
            game.handleInteraction(event.target);
        }
})

})

