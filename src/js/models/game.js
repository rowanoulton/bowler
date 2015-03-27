'use strict';

var Frame = require('./frame');

/**
 * @class Game
 * @constructor
 */
var Game = function () {
    this.frames = [];
    this.pinsLeftInFrame = 10;
};

Game.prototype = {

    /**
     * Sets up game to begin
     * @method init
     */
    init: function () {
        this.frames = this.createFrames();
    },

    /**
     * Adds a new roll to the game
     * @method roll
     */
    roll: function () {
        var rollNumber = this.getRandomNumber(this.pinsLeftInFrame);

        this.pinsLeftInFrame = this.frames[0].roll(rollNumber);

        if (this.isFinished()) {
            // If there are no pins left in the frame, the game is finished
            this.finish();
        }
    },

    /**
     * Announce the completion of the game
     * @method finish
     */
    finish: function () {
        console.log('Game finished with a score of ' + this.getScore());
    },

    /**
     * Returns the overall score of the game
     * @method getScore
     * @returns {Number}
     */
    getScore: function () {
        var score = 0,
            iterator;

        for (iterator = 0; iterator < this.frames.length; iterator++) {
            score += this.frames[iterator].getScore();
        }

        return score;
    },

    /**
     * Returns true if the game is finished
     * @method isFinished
     * @returns {Boolean}
     */
    isFinished: function () {
        return this.pinsLeftInFrame === 0;
    },

    /**
     * Returns a "random" whole number up to a given maximum
     * @method getRandomNumber
     * @param {Number} max The largest acceptable random number
     * @returns {Number}
     */
    getRandomNumber: function (max) {
        return Math.floor(Math.random() * (max + 1));
    },

    /**
     * Return a series of 10 game frames, properly linked and ready to play
     * @method createFrames
     * @returns {Array}
     */
    createFrames: function () {
        var frames = [],
            iterator;

        // Create all ten game frames
        for (iterator = 0; iterator < 10; iterator++) {
            frames.push(new Frame());
        }

        // Loop through frames and set up references to each frames right sibling
        for (iterator = 0; iterator < 10; iterator++) {
            // First frame begins as the current frame
            if (iterator === 0) {
                frames[iterator].setCurrentFrame(true);
            }

            // All frames (bar the last) must contain a pointer to the next frame in the list
            if (iterator < 9) {
                frames[iterator].setNextFrame(frames[iterator+1]);
            }
        }

        return frames;
    }
};

module.exports = Game;
