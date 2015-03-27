var Game = require('./models/game'),
    bowlingGame,
    bowlingBtn,
    onBowl,
    onLoad;

// Create instance of bowling game
bowlingGame = new Game();

/**
 * Set up bowling game on document load
 * @method onLoad
 */
onLoad = function () {
    bowlingGame.init();
    bowlingBtn = document.getElementById('bowling-btn');
    bowlingBtn.addEventListener('click', onBowl, false);
};

/**
 * Roll a bowling pin
 * @method onBowl
 */
onBowl = function () {
    bowlingGame.roll();
};

// Attach listener to DOM load event
document.addEventListener('DOMContentLoaded', onLoad);
