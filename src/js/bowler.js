var Game = require('./models/game'),
    gameRenderElement,
    bowlingGame,
    bowlingBtn,
    renderGame,
    onFinish,
    onBowl,
    onLoad;

// Create instance of bowling game
bowlingGame = new Game();

/**
 * Render the game state to the appropriate element
 * @method renderGame
 */
renderGame = function () {
    gameRenderElement.innerHTML = bowlingGame.getHTML();
};

/**
 * Set up bowling game on document load
 * @method onLoad
 */
onLoad = function () {
    bowlingGame.init();
    gameRenderElement = document.getElementById('game');
    bowlingBtn = document.getElementById('bowling-btn');
    bowlingBtn.addEventListener('click', onBowl, false);
};

/**
 * Roll a bowling pin
 * @method onBowl
 */
onBowl = function () {
    bowlingGame.roll();
    renderGame();

    if (bowlingGame.isFinished()) {
        onFinish();
    }
};

/**
 * Complete the game
 * @method onFinish
 */
onFinish = function () {
    // Get rid of the "Bowl" button
    bowlingBtn.parentNode.removeChild(bowlingBtn);
    console.log('Finished with a score of ' + bowlingGame.getScore());
};

// Attach listener to DOM load event
document.addEventListener('DOMContentLoaded', onLoad);
