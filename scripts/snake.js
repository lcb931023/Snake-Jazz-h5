// snake class contains all data and behavior of the snake

class Snake {
  constructor(color, spawnX, spawnY) {
    this.color = color
    this.spawnX = spawnX
    this.spawnY = spawnY
    this.arrBody = []
    this.arrPalette = []
    this.reset()
  }
  reset() {
    this.arrBody.length = 0
    this.dx = 10
    this.dy = 0
    this.isChangingDirection = false
    this.score = 0
    // reset the palette; fill it with the snake's color
    this.arrPalette.length = SNAKE_SPAWN_LENGTH
    this.arrPalette.fill(this.color)
  }
  spawn() {
    for (let i = 0; i < SNAKE_SPAWN_LENGTH; i++) {
      this.arrBody.push({
        x: this.spawnX - GRID_SIZE * i,
        y: this.spawnY
      })
    }
  }
  grow() {
    // TODO
  }
}