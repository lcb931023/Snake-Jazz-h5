

const game = {
  initialized: false,
  state: {
    allFood: [],
    allSnake: [],
  },
  init() {
    if (this.initialized) return
    // initialize webaudio with a user interaction
    Tone.start();
    // prep
    // renderer.init(canvas)
    this.reset();
    // start rendering
    requestAnimationFrame(()=>this.animate())
    this.initialized = true
  },
  animate() {
    renderer.render(this.state)
    requestAnimationFrame(()=>this.animate())
  },
  start() {
    document.querySelector('.subtitle').style.opacity = 0;
    game.reset()

    for (let index = 0; index < FOOD_COUNT; index++) {
      dispenser.spawnFood()
    }
    
    this.state.allSnake.forEach(snake => snake.spawn())
    // start music
    Tone.Transport.start();
  },
  /**
   * Step forward the game; move the snake and check food status
   */
  step(beatIndex) {
    // TODO
    // move snake
    this.state.allSnake.forEach(snake => {
      snake.move()
    });
  },
  gameover() {
    Tone.getDestination().volume.rampTo(-Infinity, 10);
    document.querySelector('.subtitle').style.opacity = 1;
  },
  reset() {
    // reset audio setting
    Tone.getDestination().volume.value = 0;
    Tone.Transport.bpm.value = 140;
    Tone.Transport.swing = .3; // this actually can't be too high. right now is a good triplet feel
    Tone.Transport.swingSubdivision = "8n";
    backingTrack.volume.value = -9
    // reset game state
    this.state.allFood.length = 0
    this.state.allSnake.length = 0
    // left and right snake. use different pianos
    const snakeLeft = new Snake("1", "#dd4a68", 100, 300)
    const snakeRight = new Snake("2", "#22cfa4", 300, 300)
    // HACK this assign is weird and bad, need better form
    snakeLeft.piano = pianoLeft
    snakeRight.piano = pianoRight
    this.state.allSnake.push(snakeLeft)
    this.state.allSnake.push(snakeRight)
  },
}