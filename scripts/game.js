const backingTrack = new Tone.Player("audio/backing/so-what-32m.mp3").toDestination();
backingTrack.volume.value = -9
const backingLoop = new Tone.Loop(time => {
  console.log("playing backing track");
  backingTrack.start();
}, "32m").start(0);

Tone.loaded().then(() => {
  console.log("All audio buffers loaded!");
  // TODO this is where the screen goes from "loading..." to "Loaded!",
  // and we goad the user to click on screen to start (game.init())
})

const game = {
  state: {
    allFood: [],
    allSnake: [],
  },
  init() {
    // initialize webaudio with a user interaction
    Tone.start();
    // prep
    renderer.init(canvas)
    this.reset();
  },
  start() {
    // start backing track
    Tone.Transport.start();
    this.state.allSnake.forEach(snake => snake.spawn())
  },
  gameover() {

  },
  reset() {
    // reset audio setting
    Tone.Transport.bpm.value = 140;
    Tone.Transport.swing = .3; // this actually can't be too high. right now is a good triplet feel
    Tone.Transport.swingSubdivision = "8n";
    backingTrack.volume.value = -9
    // reset game state
    this.state.allFood.length = 0
    this.state.allSnake.length = 0
    this.state.allSnake.push(new Snake("#dd4a68", 100, 100))
    this.state.allSnake.push(new Snake("#00458b", 100, 300))
  },
}