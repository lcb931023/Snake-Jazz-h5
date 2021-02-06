const TRACKER_LENGTH = 64;

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

let beatCounter = 0

function onBeat (time, index) {
  // TODO handle situation when the tracker has more than 64 beats
  
  beatCounter ++; // the number of 16n notes played so far. Starts with 1
  // interpret lines in the tracker
  const note = tracker[index]
  if (!note) return
  if (!note[0]) return
  let pitch = note[0]
  const duration = note[1]
  // emphasize odd 8th notes
  const velocity = (index % 4 == 2 || index % 4 == 3) ? 0.6:1
  // shift the pitch for that 8 measures of E-11 chord
  // TODO algorify magic math
  const measurePosition = beatCounter % (16*32)
  if (measurePosition > (16*16) && measurePosition <= (16*24)) {
    pitch = Tone.Frequency(pitch).transpose(1);
  }
  piano.triggerAttackRelease(pitch, duration, time, velocity)
};


Tone.Transport.bpm.value = 140;
Tone.Transport.swing = .3; // this actually can't be too high. 0.3 is a good triplet feel
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
  // There's a chance that we add a rest
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

// TEST
function addRandomLine(collection) {
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

// const piano = new Tone.Synth().toDestination();