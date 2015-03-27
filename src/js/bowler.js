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
    // Initialise bowling game
    bowlingGame.init();

    console.log(bowlingGame);
};

document.addEventListener('DOMContentLoaded', onLoad);
