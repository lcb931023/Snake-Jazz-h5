const renderer = {
  init(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  },
  render(state) {
    // clear board with the background
    this.ctx.fillStyle = "#32304c"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // draw all food
    state.allFood.forEach((food => {
      this.ctx.fillStyle = food.color,
      this.ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
    }))
    state.allSnake.forEach((snake) => {
      // draw each parts of the snake
      snake.arrBody.forEach((part, i) => {
        this.ctx.fillStyle = snake.arrPalette[i]
        this.ctx.fillRect(part.x, part.y, GRID_SIZE, GRID_SIZE)
      });
    })
  },
}