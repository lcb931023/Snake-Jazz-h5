

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
    // start rendering
    requestAnimationFrame(()=>this.animate())
  },
  animate() {
    renderer.render(this.state)
    requestAnimationFrame(()=>this.animate())
  },
  start() {
    this.state.allSnake.forEach(snake => snake.spawn())
    // start music
    Tone.Transport.start();
  },
  /**
   * Step forward the game; move the snake and check food status
   */
  step(beatIndex) {
    console.log("step", beatIndex)
    // TODO
    // move snake
    this.state.allSnake.forEach(snake => {
      snake.move()
    });
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
    this.state.allSnake.push(new Snake("1", "#dd4a68", 100, 100))
    this.state.allSnake.push(new Snake("2", "#00458b", 100, 300))
  },
}