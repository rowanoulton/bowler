'use strict';

var template = '<li class="frame"><span class="frame-roll frame-roll--first">{{roll1}}</span><span class="frame-roll frame-roll--second">{{roll2}}</span><span class="frame-score">{{score}}</span></li>';

/**
 * @class Frame
 * @constructor
 */
var Frame = function () {
    this.rolls = [];
    this.score = 0;
    this.current = false;
    this.addNextScore = 0;
    this.nextFrame = null;
};

Frame.prototype = {

    /**
     * Returns the score
     * @method getScore
     * @returns {Number}
     */
    getScore: function () {
        return this.score;
    },

    /**
     * Set flag for whether this is the current frame of the game
     * @method setCurrentFrame
     * @param {Boolean} flag
     */
    setCurrentFrame: function (flag) {
        this.current = flag;
    },

    /**
     * Returns true if frame is the current frame of the game
     * @method isCurrentFrame
     * @returns {Boolean}
     */
    isCurrentFrame: function () {
        return this.current;
    },

    /**
     * Return the next frame in the list
     * @method getNextFrame
     * @returns {Frame|null}
     */
    getNextFrame: function () {
        return this.nextFrame;
    },

    /**
     * Set pointer to the next frame in the list
     * @method setNextFrame
     */
    setNextFrame: function (frame) {
        this.nextFrame = frame;
    },

    /**
     * Return whether this is the last frame in the game
     * @method isLastFrame
     * @returns {Boolean}
     */
    isLastFrame: function () {
        return this.nextFrame === null;
    },

    /**
     * Return whether a strike was rolled in this frame
     * @method isStrike
     * @returns {Boolean}
     */
    isStrike: function () {
        return this.rolls.length >= 1 && this.rolls[0] === 10;
    },

    /**
     * Return whether a spare was rolled in this frame
     * @method isSpare
     * @returns {Boolean}
     */
    isSpare: function () {
        return this.rolls.length >= 2 && (this.rolls[0] + this.rolls[1]) === 10;
    },

    /**
     * Returns true if there are no more rolls left in this frame
     * @method isFinished
     * @returns {Boolean}
     */
    isFinished: function () {
        // @todo: Logic for allowing last frame to have 3 rolls under certain conditions
        return this.isStrike() || this.rolls.length === 2;
    },

    /**
     * Move active state from this frame to the next in the list
     * @method enterNextFrame
     */
    enterNextFrame: function () {
        this.setCurrentFrame(false);
        this.getNextFrame().setCurrentFrame(true);
    },

    /**
     * Pass a roll to (or through) the frame.
     * If this is the current frame of the game, the score is added.
     * If this is not the current frame of the game, the roll is passed to the next frame
     * in the list. The roll will be added to the score of this frame if a strike or spare
     * was previously rolled in this frame and this is a relevant subsequent roll to
     * that strike/spare.
     * @method roll
     * @param {Number} number
     * @returns {Number}
     */
    roll: function (number) {
        // Are we the current frame of the game?
        if (!this.isCurrentFrame()) {
            // Are we adding subsequent rolls to our score? (eg. we are a strike / spare)
            if (this.addNextScore > 0) {
                this.addNextScore--;
                this.score += number;
            }

            // Pass roll to next frame
            return this.getNextFrame().roll(number);
        }

        // Add score
        this.score += number;

        // Add roll
        this.rolls.push(number);

        // Is this frame finished?
        if (this.isFinished()) {
            // Are we a strike or a spare? If so, we need to listen to the next subsequent
            // rolls (2 or 1 respectively)
            this.addNextScore = this.isStrike() ? 2 : this.isSpare() ? 1 : 0;

            // Are we at the last frame?
            if (!this.isLastFrame()) {
                // Move game to next frame
                this.enterNextFrame();
            } else {
                // Returning zero signifies the game is finished
                return 0;
            }
        }

        // Return the number of available pins left in this frame (used for next roll)
        // If a strike was bowled, the available pins are 10 as they belong to the next, fresh frame
        return this.isStrike() || this.isFinished() ? 10 : (10 - this.getScore());
    },

    /**
     * Return a string of HTML representing the frame
     * @method getHTML
     * @returns {String}
     */
    getHTML: function () {
        var score = this.getScore(),
            scoreString = '',
            roll1String = '',
            roll2String = '',
            html = template;

        // If there is at least one roll
        if (this.rolls.length > 0) {
            // Display is special in case of a strike
            roll1String = this.isStrike() ? 'X' : this.rolls[0];
        }

        // If there are at least 2 rolls
        if (this.rolls.length > 1) {
            // Display is special in case of a spare
            roll2String = this.isSpare() ? '/' : this.rolls[1];
        }

        // Avoid displaying non-zero scores unless frame is finished
        if (score > 0 || this.isFinished()) scoreString = score.toString();

        // Hacky string replacement to fill in template string
        html = html.replace('{{roll1}}', roll1String);
        html = html.replace('{{roll2}}', roll2String);
        html = html.replace('{{score}}', scoreString);

        return html;
    }
};

// Export Frame module
module.exports = Frame;
