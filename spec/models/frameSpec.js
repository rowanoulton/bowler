var Frame = require('../../src/js/models/frame');

describe('Frame', function () {
    beforeEach(function () {
        this.model = new Frame();
    });

    describe('#getScore', function () {
        it('should return zero for a new frame', function () {
            expect(this.model.getScore()).toEqual(0);
        });

        it('should return the score', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(6);
            expect(this.model.getScore()).toEqual(6);
            this.model.roll(2);
            expect(this.model.getScore()).toEqual(8);
        });
    });

    describe('#isCurrentFrame', function () {
        it('should return false after initialisation', function () {
            expect(this.model.isCurrentFrame()).toEqual(false);
        });

        it('should return true if frame is set as the current frame', function (){
            this.model.setCurrentFrame(true);
            expect(this.model.isCurrentFrame()).toEqual(true);
            this.model.setCurrentFrame(false);
            expect(this.model.isCurrentFrame()).toEqual(false);
        });
    });

    describe('#getNextFrame', function () {
        it('should return the next frame', function () {
            var nextFrame = new Frame();

            // It should return null until the next frame is set
            expect(this.model.getNextFrame()).toBeNull();

            // Set next frame
            this.model.setNextFrame(nextFrame);

            // It should now return the next frame
            expect(this.model.getNextFrame()).toEqual(nextFrame);
        });
    });

    describe('#isLastFrame', function () {
        it('should return false if the frame has a reference to the next frame', function () {
            var nextFrame = new Frame();

            // Set next frame reference
            this.model.setNextFrame(nextFrame);

            // Next frame is set, function should return false
            expect(this.model.isLastFrame()).toEqual(false);
        });

        it('should return true if the frame has no reference to the next frame', function () {
            expect(this.model.isLastFrame()).toEqual(true);
        });
    });

    describe('#isStrike', function () {
        it('should return false if there have been no rolls', function () {
            expect(this.model.isStrike()).toEqual(false);
        });

        it('should return false if a spare was rolled', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(8);
            this.model.roll(2);
            expect(this.model.isStrike()).toEqual(false);
        });

        it('should return false if no strike was rolled', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(1);
            expect(this.model.isStrike()).toEqual(false);
            this.model.roll(8);
            expect(this.model.isStrike()).toEqual(false);
        });

        it('should return true if a strike was rolled', function () {
            // Add a roll of 10 (which means a strike)
            this.model.setCurrentFrame(true);
            this.model.roll(10);

            // Should now be a strike
            expect(this.model.isStrike()).toEqual(true);
        });

    });

    describe('#isSpare', function () {
        it('should return false if there are no rolls', function () {
            expect(this.model.isSpare()).toEqual(false);
        });

        it('should return false if a strike was rolled', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(10);
            expect(this.model.isSpare()).toEqual(false);
        });

        it('should return false if there were 2 rolls but no spare', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(8);
            this.model.roll(1);
            expect(this.model.isSpare()).toEqual(false);
        });

        it('should return true if a spare was rolled', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(3);
            this.model.roll(7);
            expect(this.model.isSpare()).toEqual(true);
        });
    });

    describe('#isFinished', function () {
        it('should return false if there are no rolls', function () {
            expect(this.model.isFinished()).toEqual(false);
        });

        it('should return false if there has been a single roll (which was not a strike)', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(9);
            expect(this.model.isFinished()).toEqual(false);
        });

        it('should return true after two rolls', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(2);
            this.model.roll(1);
            expect(this.model.isFinished()).toEqual(true);
        });

        it('should return true after a strike', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(10);
            expect(this.model.isFinished()).toEqual(true);
        });
    });

    describe('#enterNextFrame', function () {
        it('should unset itself as the current frame', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.enterNextFrame();
            expect(this.model.isCurrentFrame()).toEqual(false);
        });

        it('should set the next frame in the list as current', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.enterNextFrame();
            expect(nextFrame.isCurrentFrame()).toEqual(true);
        });
    });

    describe('#roll', function () {
        it('should increase the score', function () {
            expect(this.model.getScore()).toEqual(0);
            this.model.setCurrentFrame(true);
            this.model.roll(7);
            expect(this.model.getScore()).toEqual(7);
        });

        it('should move to the next frame if its finished and its not the last frame', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.roll(5);
            this.model.roll(2);

            // After two rolls, frame should move to the next
            expect(this.model.isCurrentFrame()).toEqual(false);
            expect(nextFrame.isCurrentFrame()).toEqual(true);
        });

        it('should move to the next frame after a strike', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.roll(10);

            // After strike, frame should move to the next
            expect(this.model.isCurrentFrame()).toEqual(false);
            expect(nextFrame.isCurrentFrame()).toEqual(true);
        });

        it('should return the available number of pins if the game is unfinished', function () {
            this.model.setCurrentFrame(true);
            expect(this.model.roll(5)).toEqual(5);
        });

        it('should return "10" if a strike is bowled, as the next frame has 10 available pins', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            expect(this.model.roll(10)).toEqual(10);
        });

        it('should return zero if the game is finished', function () {
            this.model.setCurrentFrame(true);
            this.model.roll(5);
            expect(this.model.roll(3)).toEqual(0);
        });

        it('should pass the roll to the next frame if it is no longer the current frame', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.roll(5);
            this.model.roll(2);
            this.model.roll(3); // Should be passed to next frame
            expect(this.model.getScore()).toEqual(7);
            expect(nextFrame.getScore()).toEqual(3);
        });

        it('should add the next roll\'s score to its own if a spare was rolled', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.roll(5);
            this.model.roll(5);
            this.model.roll(3);
            expect(this.model.getScore()).toEqual(13);

            // The subsequent roll should not be added to frames score
            this.model.roll(2);
            expect(this.model.getScore()).toEqual(13);
        });

        it('should add the next two roll\'s scores to its own if a strike was rolled', function () {
            var nextFrame = new Frame();

            this.model.setCurrentFrame(true);
            this.model.setNextFrame(nextFrame);
            this.model.roll(10);
            this.model.roll(2);
            expect(this.model.getScore()).toEqual(12);
            this.model.roll(3);
            expect(this.model.getScore()).toEqual(15);
        });
    });
});
