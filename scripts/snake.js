// snake class contains all data and behavior of the snake

class Snake {
  constructor(id, color, spawnX, spawnY) {
    this.id = id
    // identifying color
    this.color = color
    // initial spot
    this.spawnX = spawnX
    this.spawnY = spawnY
    // body blocks
    this.arrBody = []
    // type of the body blocks
    this.arrPalette = []
    // musical notes registry
    this.tracker = []
    // movement
    this.dx = 10
    this.dy = 0
    this.direction = 3 // right
    this.reset()
  }
  reset() {
    this.arrBody.length = 0
    this.dx = 10
    this.dy = 0
    this.score = 0
    // reset the palette; fill it with the snake's color
    this.arrPalette.length = SNAKE_SPAWN_LENGTH
    this.arrPalette.fill(this.color)
    this.tracker.length = 0
  }
  spawn() {
    for (let i = 0; i < SNAKE_SPAWN_LENGTH; i++) {
      this.arrBody.push({
        x: this.spawnX - GRID_SIZE * i,
        y: this.spawnY
      })
    }
  }
  move() {
    // apply direction
    this.applyTurn()
    // Create the new Snake's head
    const head = {x: this.arrBody[0].x + this.dx, y: this.arrBody[0].y + this.dy};
    // Add the new head to the beginning of this.arrBody body
    this.arrBody.unshift(head);
    
    // eat food, grow snake
    let has_eaten_food = false;
    for (let i = 0; i < game.state.allFood.length; i++) {
      const food = game.state.allFood[i];
      if (this.arrBody[0].x === food.x && this.arrBody[0].y === food.y) {
        has_eaten_food = true
        // add line, grow body, yadiyadiyada
        this.grow(food)
        // remove the food
        game.state.allFood.splice(i, 1)
        // early termination (important!)
        break;
      }
    }
    if (has_eaten_food) {
      // Increase score
      this.score += 10;
      // Display score on screen
      document.getElementById(`score-${this.id}`).innerHTML = this.score;
      // Generate new food location
      dispenser.spawnFood()
    } else {
      // Remove the last part of this.arrBody body. we are walking here!
      this.arrBody.pop();
    }

  }
  // Directions: up, left, down, right
  turn(inputDir) {

    const goingUp = this.dy === -10;
    const goingLeft = this.dx === -10;
    const goingDown = this.dy === 10;
    const goingRight = this.dx === 10;

    if (
      (inputDir === 0 && !goingDown) ||
      (inputDir === 1 && !goingRight) ||
      (inputDir === 2 && !goingUp) ||
      (inputDir === 3 && !goingLeft)
    ) {
      this.direction = inputDir
    }
  }
  applyTurn() {
    if (this.direction === 0) {
      this.dx = 0;
      this.dy = -10;
      // piano.triggerAttackRelease("F4", "8t", "@16n")
    }
    if (this.direction === 1) {
      this.dx = -10;
      this.dy = 0;
      // piano.triggerAttackRelease("G4", "8t", "@16n")
    }
    if (this.direction === 2) {
      this.dx = 0;
      this.dy = 10;
      // piano.triggerAttackRelease("C5", "8t", "@16n")
    }
    if (this.direction === 3) {
      this.dx = 10;
      this.dy = 0;
      // piano.triggerAttackRelease("A4", "8t", "@16n")
    }
  }
  grow(food) {
    // add the food's corresponding line type to tracker
    this.addRandomLine(food.type)
    // add the food's color to this.arrBody body
    this.arrPalette.splice(this.arrPalette.length - 4, 0, food.color)
  }
  addRandomLine(lineTypeName) {
    const collection = LineBank[lineTypeName]
    if (!collection) throw new Error("Line type not found", lineTypeName)
    const line = collection[ Math.floor(Math.random() * collection.length) ]
    // console.log(line)
    this.addLine(line)
    // console.log(this.tracker)
  }
  /**
   * Add line to tracker
   * @param {Array} line 
   */
  addLine(line) {
    this.tracker = this.tracker.concat(convertLine(line))
    // when snake is young, we add rests sometimes
    if (this.arrBody.length > 20) return
    if (Math.random() < 0.5) {
      const rest = Rests[ Math.floor(Math.random() * Rests.length) ]
      this.tracker = this.tracker.concat(convertLine(rest))
    }
  }
}

// mapping time notations to number of 16th notes
const beatMap = {
  "16n" : 1,
  "8n"  : 2,
  "8n." : 3,
  "4n"  : 4,
  "4n." : 6,
  "2n"  : 8,
  "2n." : 12,
  "1m"  : 16,
}
/**
 * turn the line into an array of notes and durations,
 * spaced by the 16n grid.
 * @param {Array} line 
 */
function convertLine(line) {
  const spacedLine = []

  line.forEach(note => {
    // ["C4", "8n"]
    if (note.length !== 2) throw new Error("Note incorrect", note)
    spacedLine.push(note)
    const noteSpace = beatMap[note[1]]
    for (let index = 0; index < noteSpace-1; index++) {
      spacedLine.push(null)
    }
  });
  return spacedLine;
}
