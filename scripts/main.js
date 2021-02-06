const TRACKER_LENGTH = 64;
// sequencer keeps time and triggers playing each beat
const sequencer = new Tone.Sequence(
  onBeat,
  new Array(TRACKER_LENGTH).fill().map((x,i) => i), // [0,1,2,3,4,5...
  "16n").start(0);

function onBeat (time, index) {
  // interpret lines in the tracker
  // TODO handle situation when the tracker has more than 64 beats
  const note = tracker[index]
  if (!note) return
  if (!note[0]) return
  piano.triggerAttackRelease(note[0], note[1])
  console.log(time, note)
};


Tone.Transport.bpm.value = 140;
Tone.Transport.swing = 1;
Tone.Transport.swingSubdivision = "8n";
Tone.Transport.start();

// tracker keeps the musical content.
// spaces are added using null
let tracker = []

/**
 * Add line to tracker
 * @param {Array} line 
 */
function addLine(line) {
  tracker = tracker.concat(convertLine(line))
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

// const piano = new Tone.Sampler({
// 	urls: {
// 		A3: "A3v10.ogg",
// 		A4: "A4v10.ogg",
// 		A5: "A5v10.ogg",
// 	},
// 	baseUrl: "audio/salamander/",
// 	onload: () => {
//     console.log("piano sample loaded")
// 		// piano.triggerAttackRelease(["C4"], "8n");
// 	}
// }).toDestination();

const piano = new Tone.Synth().toDestination();