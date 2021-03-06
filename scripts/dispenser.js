const dispenser = {
  spawnFood() {
    // Generate random food pos
    let foodX = getRandomGridPos(0, canvas.width - 10);
    let foodY = getRandomGridPos(0, canvas.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    let blocked = false

    blocked = blocked || checkBlockedBySnakeBody(foodX, foodY) || checkBlockedByFood(foodX, foodY)
    if (blocked) return this.spawnFood(); // try again buddy
    else {
      const typeOfLine = LineBankGroups[Math.floor(Math.random() * LineBankGroups.length)]

      // push the food pos into array
      game.state.allFood.push({
        x: foodX,
        y: foodY,
        type : typeOfLine[0],
        color: typeOfLine[1],
      })
    }
  },
  
}
// Utility
function getRandomGridPos(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
function checkBlockedBySnakeBody(x, y) {
  for (let i = 0; i < game.state.allSnake.length; i++) {
    const snake = game.state.allSnake[i];
    for (let j = 0; j < snake.arrBody.length; j++) {
      const body = snake.arrBody[j];
      if (body.x == x && body.y == y) return true
    }
  }

  return false
}

/** check if location is blocked by existing food on the board */
function checkBlockedByFood(x, y) {
  for (let i = 0; i < game.state.allFood.length; i++) {
    const food = game.state.allFood[i];
    if (food.x == x && food.y == y) return true
  }
  return false
}