var Game = require('./models/game'),
    bowlingGame,
    onLoad;

// Create instance of bowling game
bowlingGame = new Game();

/**
 * Set up bowling game on document load
 * @method onLoad
 */
onLoad = function () {
    // Initialize bowling game
    bowlingGame.init();
};

document.addEventListener('DOMContentLoaded', onLoad);
