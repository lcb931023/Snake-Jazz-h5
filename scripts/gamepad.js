gameControl.on('connect', gamepad => {
  console.log('gamepad connected!', gamepad);
  gamepad.axeThreshold = [.8]
  // start
  gamepad.after('button9', ()=>{
    if (game.initialized) game.start()
  })

  // TODO handle when there are two gamepads. 
  // does passing in the id work?
  gamepad.before('up', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(0)
  })
  gamepad.before('button12', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(0)
  })
  gamepad.before('left', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(1)
  })
  gamepad.before('button14', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(1)
  })
  gamepad.before('down', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(2)
  })
  gamepad.before('button13', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(2)
  })
  gamepad.before('right', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(3)
  })
  gamepad.before('button15', ()=>{
    if (! game.initialized) return
    game.state.allSnake[gamepad.id].turn(3)
  })

  // clear tracker when press x
  gamepad.before('button2', ()=>{
    game.state.allSnake[gamepad.id].tracker.length = 0
  })
})