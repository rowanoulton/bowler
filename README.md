# Bowler
A simple browser-based system for scoring a game of bowling.

![A simple browser-based system for scoring a game of bowling](https://dl.dropboxusercontent.com/u/1432453/Github/Bowler/bowler-0.png)

#### Rules of the game

- A game consists of 10 frames.
- In general each frame has 2 rolls.
- In general a player scores the number of pins knocked down.
- If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls.
- If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.

Further details about the way bowling is scored can be sought [here](http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm).

#### Solution

To achieve this, I have opted to use an array of frames that behave like a crude [singly linked list](https://en.wikipedia.org/wiki/Linked_list#Singly_linked_list). The following diagrams attempt to explain the implementation:

![Each frame (bar the last) has a reference to the next frame in the list](https://dl.dropboxusercontent.com/u/1432453/Github/Bowler/bowler-1.jpg)

1) Each frame (bar the last) has a reference to the next frame in the list.

![Each roll is passed through the list of frames](https://dl.dropboxusercontent.com/u/1432453/Github/Bowler/bowler-2.jpg)

2) Each roll is passed through the list of frames.

![The roll continues through the list until it reaches the active (or "current") frame](https://dl.dropboxusercontent.com/u/1432453/Github/Bowler/bowler-3.jpg)

3) The roll continues through the list until it reaches the active (or "current") frame. The score is then added to this frame, and the frame decides whether it is still active.

If the frame decides it is no longer active (all pins have been knocked down or there have been 2 rolls) it then moves the active state to the next frame in the list.

Through this process, the game progresses through each frame until the last. The final frame is then responsible for communicating that the game has finished.

![](https://dl.dropboxusercontent.com/u/1432453/Github/Bowler/bowler-4.jpg)

4) As each roll is passed through all frames preceding the active one, frames which need to add subsequent rolls to their score (in the case of a strike or a spare) are able to do so.

#### Disadvantages of this approach

There are a number of disadvantages to this approach, some of which are:

- All frames must be created and linked to their neighbour at the beginning of the game
- The last frame is responsible for communicating game completion, which should ideally be a responsibility of the game class itself
- The list must be traversed in order to calculate the total score as the game progresses

#### Setup

To get started, you will need to install the dependencies with [npm](https://nodejs.org/):

```
npm install
```

If you don't have gulp installed globally, you will also need to do so:

```
npm install -g gulp
```

Once installed, you can generate the needed assets with gulp:

```
gulp build
```

Or run the unit tests (which will also perform a build):

```
gulp test
```

For development, I recommend use of the watch task (`gulp watch`). It will build and re-run tests whenever you make changes to the source Javascript files (tests included).


#### License

[MIT](https://github.com/rowanoulton/bowler/blob/master/LICENSE). Use as you please!