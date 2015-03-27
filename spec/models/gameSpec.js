var Game = require('../../src/js/models/game.js');

describe('Game', function () {
    beforeEach(function () {
        this.model = new Game();
    });

    describe('#createFrames', function () {
        it('should return an array of 10 frames', function () {
            expect(this.model.createFrames().length).toEqual(10);
        });

        it('should return an array of linked frames', function () {
            var frames = this.model.createFrames(),
                iterator;

            for (iterator = 0; iterator < (frames.length - 1); iterator++) {
                expect(frames[iterator].getNextFrame() === null).toEqual(false);
            }
        });

        it('should set the first frame to be current', function () {
            var frames = this.model.createFrames();
            expect(frames[0].isCurrentFrame()).toEqual(true);
        });

        it('should leave the final frames "next" reference as null', function () {
            var frames = this.model.createFrames();
            expect(frames[9].getNextFrame()).toBeNull();
        });
    });

    describe('#getScore', function () {
        it('should return zero for a new game', function () {
            expect(this.model.getScore()).toEqual(0);
        });

        it('should return the combined total of its child frames scores', function () {
            var frames = this.model.createFrames();
            frames[0].roll(3);
            frames[0].roll(3);
            frames[0].roll(3);
            this.model.setFrames(frames);
            expect(this.model.getScore()).toEqual(9);
        });
    });

    describe('#getRandomRoll', function () {
        it('should always return a number from 0 to the given maximum', function () {
            var max = 7,
                maxPlusOne = max + 1,
                iterator,
                roll;

            for (iterator = 0; iterator < 500; iterator++) {
                roll = this.model.getRandomRoll(max);

                expect(roll).toBeLessThan(maxPlusOne);
                expect(roll).toBeGreaterThan(-1);
            }
        });
    });

    describe('#isFinished', function () {
        it('should return false for a new game', function () {
            expect(this.model.isFinished()).toEqual(false);
        });

        it('should return true for a finished game', function () {
            var frames = this.model.createFrames(),
                isFinished,
                iterator;

            // Roll 9 strikes
            for (iterator = 0; iterator < 9; iterator++) {
                frames[0].roll(10);
            }

            this.model.setFrames(frames);

            // Finish the game with 1 or 2 more rolls
            this.model.roll();
            if (!this.model.isFinished()) {
                this.model.roll();
            }

            // Check that game state is finished
            expect(this.model.isFinished()).toEqual(true);
        });
    });
});
