const TRACKER_LENGTH = 32;

const backingTrack = new Tone.Player("audio/backing/so-what-32m.mp3").toDestination();
backingTrack.volume.value = -9
const backingLoop = new Tone.Loop(time => {
  console.log("playing backing track");
  backingTrack.start();
}, "32m").start(0);

// sequencer keeps time and triggers playing each beat
const sequencer = new Tone.Sequence(
  onBeat,
  new Array(TRACKER_LENGTH).fill().map((x,i) => i), // [0,1,2,3,4,5...
  "16n").start(0);

// use beat counter to determine where we are in a song.
// and modulate accordingly
let beatCounter = 0

/**
 * Step sequencer runs this every beat.
 * We use it to play the piano note in the tracker, if any.
 * @param {Number} time precise timing info given by Tone
 * @param {Number} beatIndex which beat of the sequence are we at now
 */
function onBeat (time, beatIndex) {
  // Control game rendering timing
  Tone.Draw.schedule(function(){
    gameLoop()
  }, time)

  beatCounter ++; // the number of 16n notes played so far. Starts with 1

  // when the tracker has more than 64 beats,
  // skip the first 64 beats and play the rest,
  // and so on.
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
  // in So What
  // TODO algorify magic math
  const measurePosition = beatCounter % (16*32)
  if (measurePosition > (16*16) && measurePosition <= (16*24)) {
    pitch = Tone.Frequency(pitch).transpose(1);
  }
  piano.triggerAttackRelease(pitch, duration, time, velocity)
};


Tone.Transport.bpm.value = 140;
Tone.Transport.swing = .3; // this actually can't be too high. right now is a good triplet feel
Tone.Transport.swingSubdivision = "8n";
Tone.loaded().then(() => {
  console.log("loaded!");
  Tone.Transport.start();
})


// tracker keeps the musical content.
// spaces are added using null
let tracker = []

/**
 * Add line to tracker
 * @param {Array} line 
 */
function addLine(line) {
  tracker = tracker.concat(convertLine(line))
  // when snake is young, we add rests sometimes
  if (snake.length > 20) return
  if (Math.random() < 0.5) {
    const rest = Rests[ Math.floor(Math.random() * Rests.length) ]
    tracker = tracker.concat(convertLine(rest))
  }
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

function addRandomLine(lineTypeName) {
  const collection = LineBank[lineTypeName]
  if (!collection) throw new Error("Line type not found", lineTypeName)
  const line = collection[ Math.floor(Math.random() * collection.length) ]
  console.log(line)
  addLine(line)
  console.log(tracker)
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

////////////// piano

const piano = new Tone.Sampler({
	urls: {
		A3: "A3v10.ogg",
		A4: "A4v10.ogg",
		A5: "A5v10.ogg",
	},
	baseUrl: "audio/salamander/",
	onload: () => {
    console.log("piano sample loaded")
	}
}).toDestination();

/////////////// SNAKE GAME /////////////
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]
// array for rendering colorful snake body
const snakePalette = [
  "#a3bcd0",
  "#a3bcd0",
  "#a3bcd0",
  "#a3bcd0",
  "#a3bcd0",
]
let score = 0
// True if changing direction
let changing_direction = false;
// allFood
const allFood = []
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

const FOOD_COUNT = 100

for (let index = 0; index < FOOD_COUNT; index++) {
  gen_food()
  
}

function gameLoop() {
  if (has_game_ended()) return;

  changing_direction = false;
  clear_board();
  drawAllFood();
  move_snake();
  drawSnake();

}

function clear_board() {
  ctx.fillStyle = "#32304c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  snake.forEach(drawSnakePart)
}
function drawSnakePart(snakePart, i){

  ctx.fillStyle = snakePalette[i]
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}
function move_snake() {
  // DONE!
}
function drawAllFood() {
  // DONE
}


document.addEventListener("keydown", change_direction)
function change_direction(event) {
  // DONE!
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function gen_food() {
  // DONE!
}
