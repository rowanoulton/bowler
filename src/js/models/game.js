'use strict';

var template = '<ul>{{frames}}</ul><p class="frame-total-score">Overall Score <span class="frame-total-score-figure">{{score}}</span></p>';

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
        this.setFrames(this.createFrames());
    },

    /**
     * Adds a new roll to the game
     * @method roll
     */
    roll: function () {
        var rollNumber = this.getRandomRoll(this.pinsLeftInFrame);
        this.pinsLeftInFrame = this.frames[0].roll(rollNumber);
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
     * @method getRandomRoll
     * @param {Number} max The largest acceptable random number
     * @returns {Number}
     */
    getRandomRoll: function (max) {
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
    },

    /**
     * Set the frames for the game
     * @method setFrames
     * @param {Array} frames An array of 10 properly-linked frames
     */
    setFrames: function (frames) {
        this.frames = frames;
    },

    /**
     * Get the frames for the game
     * @method getFrames
     * @returns {Array}
     */
    getFrames: function () {
        return this.frames;
    },

    /**
     * Returns a string of HTML representing the game state
     * @method getHTML
     * @returns {String}
     */
    getHTML: function () {
        var scoreString = this.getScore().toString(),
            html = template,
            framesString = '',
            iterator;

        for (iterator = 0; iterator < this.frames.length; iterator++) {
            framesString += this.frames[iterator].getHTML();
        }

        html = html.replace('{{frames}}', framesString);
        html = html.replace('{{score}}', scoreString);

        return html;
    }
};

module.exports = Game;
