// sequencer keeps time and triggers playing each beat
const sequencer = new Tone.Sequence(
  onBeat,
  new Array(16).fill().map((x,i) => i), // [0,1,2,3,4,5...
  "16n").start(0);

function onBeat (time, index) {
  console.log(time, index);
  // TODO interpret lines in the tracker
};


Tone.Transport.bpm = 120;
Tone.Transport.start();

// tracker keeps the musical content
const tracker = new Array(16)

/**
 * Add line to tracker
 * @param {array} line 
 */
function addLine(line) {
  // TODO 
}

