// PARAMETERS
const GRID_SIZE = 10

const SNAKE_SPAWN_LENGTH = 5
const TRACKER_LENGTH = 32
const FOOD_COUNT = 50

const canvas = document.getElementById("canvas")

const backingTrack = new Tone.Player("audio/backing/so-what-32m.mp3").toDestination();
backingTrack.volume.value = -4
const backingLoop = new Tone.Loop(time => {
  console.log("playing backing track");
  backingTrack.start();
}, "32m").start(0);

// Piano plays the snake sounds
// one for left and one for right
const panVolLeft = new Tone.PanVol(-1, 12).toDestination()
const panVolRight = new Tone.PanVol(1, 12).toDestination()
const pianoLeft = new Tone.Sampler({
	urls: {
		A3: "A3v10.ogg",
		A4: "A4v10.ogg",
		A5: "A5v10.ogg",
	},
	baseUrl: "audio/salamander/",
	onload: () => {
    console.log("pianoLeft sample loaded")
	}
}).connect(panVolLeft);

const pianoRight = new Tone.Sampler({
	urls: {
		A3: "A3v10.ogg",
		A4: "A4v10.ogg",
		A5: "A5v10.ogg",
	},
	baseUrl: "audio/salamander/",
	onload: () => {
    console.log("pianoRight sample loaded")
	}
}).connect(panVolRight);

// sequencer keeps time and triggers playing each beat
const sequencer = new Tone.Sequence(
  onBeat,
  new Array(TRACKER_LENGTH).fill().map((x,i) => i), // [0,1,2,3,4,5...
  "16n").start(0);

let beatCounter = 0

function onBeat (time, beatIndex) {
  // snake moves with the beat
  Tone.Draw.schedule(function(){
    game.step(beatIndex)
  }, time)

  beatCounter ++; // the number of 16n notes played so far. Starts with 1

  game.state.allSnake.forEach(snake => {
    const {tracker} = snake
    // when the tracker has more than 64 beats,
    // skip the first 64 beats and play the rest,
    // and so on.
    // TODO adjust this. 
    // this currently means the playing stops when we eat too much.
    // clunky experience.
    let trackerIndex = beatIndex;
    if (tracker.length > TRACKER_LENGTH) trackerIndex = beatIndex + Math.floor((tracker.length-1)/TRACKER_LENGTH) * TRACKER_LENGTH;
    
    // interpret lines in the tracker
    const note = tracker[trackerIndex]
    if (!note) return
    if (!note[0]) return
    let pitch = note[0]
    const duration = note[1]
    // emphasize odd 8th notes
    const velocity = (beatIndex % 4 == 2 || beatIndex % 4 == 3) ? 0.6:1
    // shift the pitch for that 8 measures of E-11 chord
    // TODO algorify magic math
    const measurePosition = beatCounter % (16*32)
    if (measurePosition > (16*16) && measurePosition <= (16*24)) {
      pitch = Tone.Frequency(pitch).transpose(1);
    }
    snake.piano.triggerAttackRelease(pitch, duration, time, velocity)
  })
};

Tone.loaded().then(() => {
  console.log("All audio buffers loaded!");
  // TODO this is where the screen goes from "loading..." to "Loaded!",
  // and we goad the user to click on screen to start (game.init())
})

// Control
// NOTE open this up for more than 2 snakes... ?
document.addEventListener("keydown", (event) => {
  // key.code for each player. 
  // the array position corresponds to direction: up, left, down, right
  const p1Control = ["KeyW", "KeyA", "KeyS", "KeyD"]
  const p2Control = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]

  const keyPressed = event.code

  const p1Direction = p1Control.indexOf(keyPressed)
  if (p1Direction !== -1) game.state.allSnake[0].turn(p1Direction)
  const p2Direction = p2Control.indexOf(keyPressed)
  if (p2Direction !== -1) game.state.allSnake[1].turn(p2Direction)
})

// init game manager // which controls both the music and the game

// init snakes

// on start, game manager starts game

// when death condition's met, game manager stops the game and displays game over

// when restarted, game manager cleans up, resets things, and start the game