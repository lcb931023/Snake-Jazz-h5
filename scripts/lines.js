/// NOTE the blues lick may need to be shifted up 5 intervals
/// in order to fit the Dorian tonality of So What.
/// a line of 
/// A3 C4 D4 Eb4 E4 G4, would become
/// D4 F4 G4 Ab4 A4 C5

const LongBluesLicks = [
  [
    [0, "8n"], ["Eb4", "16n"], ["G4", "16n"],
    ["Eb4", "16n"], ["D4", "16n"], ["C4", "16n"], ["A3", "16n"],
    ["C4", "8n"]
  ], // 10 x 16n
  [
    [0, "8n"], ["A4", "8n"],
    ["A4","8n"], ["C5","8n"],
    ["Eb4","16n"], ["D4","16n"], ["C4","16n"], ["D4","16n"],
    [0,"16n"], ["C4","8n."]
  ], // 16 x 16n
]

const ShortBluesLicks = [
  [[0, "8n"], ["D4", "8n"], ["Eb4", "8n"], ["E4", "8n"]],
  [[0, "16n"], ["D4", "16n"], ["Eb4", "16n"], ["E4", "16n"]],
  [["Eb4", "8n"], ["D4", "8n"], ["C4", "8n"], ["A3", "8n"]],
  [["Eb4", "16n"], ["D4", "16n"], ["C4", "16n"], ["A3", "16n"]],
  [[0, "8n"], ["D4", "8n"], ["Eb4", "8n"], ["C4", "8n"]],
  [[0, "16n"], ["D4", "16n"], ["Eb4", "16n"], ["C4", "16n"]],
  [["Eb4", "8n"], [0, "8n"], ["D4", "8n"], ["C4", "8n"]],
  [["Eb4", "16n"], [0, "16n"], ["D4", "16n"], ["C4", "16n"]],
  [["Eb4", "8n"], ["E4", "8n"], [0, "8n"], ["A4", "8n"]],
  [["Eb4", "16n"], ["E4", "16n"], [0, "16n"], ["A4", "16n"]],
  [["A3", "8n"], ["Eb4", "8n"], ["A3", "8n"], ["C4", "8n"]],
  [["A3", "16n"], ["Eb4", "16n"], ["A3", "16n"], ["C4", "16n"]],
  // trills
  [["E4", "16n"],  ["G4", "16n"],  ["E4", "16n"],  ["G4", "16n"]],
  [["Eb4", "16n"], ["G4", "16n"],  ["Eb4", "16n"], ["G4", "16n"]],
  [["D4", "16n"],  ["C4", "16n"],  ["D4", "16n"],  ["C4", "16n"]],
  // non-uniform lines
  [["D4", "16n"], ["C4", "16n"], ["A3", "16n"], ["G3", "16n"], ["A3", "4n"]],
  [["Eb4", "8n"], ["E4", "8n"], ["G4", "4n"]],
]

const Turnarounds = [
  [["Bb3", "8n"], ["Bb3", "8n"], ["A3", "8n"], ["A3", "8n"], ["Ab3", "8n"], ["Ab3", "8n"], ["G3", "4n"]],
  [['D4', '8n'],['Eb4', '8n'],['E4', '8n'],['F4', '8n'],['Gb4', '8n'],['G4', '8n']],
  [['D4', '16n'],['Eb4', '16n'],['E4', '16n'],['F4', '16n'],['Gb4', '16n'],['G4', '16n']],
]

// non-blues
const ShortLicks = [
  [["B3", "16n"], ["C4", "16n"], ["E4", "16n"], ["B4", "16n"], ["A4", "4n"]],
  [["D4","16n"],["E4","16n"],["F4","16n"],["C5","16n"],["B4","4n"]],
  // Lawrence Ku's lick
  [["B4","8n"],["A4","8n"],["E4","8n"],["C4","8n"],["B3","8n"],["A3","8n"]],
  [["B4","16n"],["A4","16n"],["E4","16n"],["C4","16n"],["B3","16n"],["A3","16n"]],
]

const UpwardArpeggios = [

  // I chord arp, in 6s
  // B3,C4,E4,G4,B4,C5,E5,G5,
  
  [["B3","8n"],["C4","8n"],["E4","8n"],["G4","8n"],["B4","8n"],["C5","8n"]],
  [["C4","8n"],["E4","8n"],["G4","8n"],["B4","8n"],["C5","8n"],["E5","8n"]],
  [["E4","8n"],["G4","8n"],["B4","8n"],["C5","8n"],["E5","8n"],["G5","8n"]],
  [["B3","16n"],["C4","16n"],["E4","16n"],["G4","16n"],["B4","16n"],["C5","16n"]],
  [["C4","16n"],["E4","16n"],["G4","16n"],["B4","16n"],["C5","16n"],["E5","16n"]],
  [["E4","16n"],["G4","16n"],["B4","16n"],["C5","16n"],["E5","16n"],["G5","16n"]],

  // ii chord arp,in 6s
  // A3,C4,D4,F4,A4,C5,D5,F5,
  
  [["A3","8n"],["C4","8n"],["D4","8n"],["F4","8n"],["A4","8n"],["C5","8n"]],
  [["C4","8n"],["D4","8n"],["F4","8n"],["A4","8n"],["C5","8n"],["D5","8n"]],
  [["D4","8n"],["F4","8n"],["A4","8n"],["C5","8n"],["D5","8n"],["F5","8n"]],
  [["A3","16n"],["C4","16n"],["D4","16n"],["F4","16n"],["A4","16n"],["C5","16n"]],
  [["C4","16n"],["D4","16n"],["F4","16n"],["A4","16n"],["C5","16n"],["D5","16n"]],
  [["D4","16n"],["F4","16n"],["A4","16n"],["C5","16n"],["D5","16n"],["F5","16n"]],

  // I9 chord arp, in 6s
  // B3,C4,D4,E4,G4,B4,C5,D5,
  
  [["B3","8n"],["C4","8n"],["D4","8n"],["E4","8n"],["G4","8n"],["B4","8n"]],
  [["C4","8n"],["D4","8n"],["E4","8n"],["G4","8n"],["B4","8n"],["C5","8n"]],
  [["D4","8n"],["E4","8n"],["G4","8n"],["B4","8n"],["C5","8n"],["D5","8n"]],
  [["B3","16n"],["C4","16n"],["D4","16n"],["E4","16n"],["G4","16n"],["B4","16n"]],
  [["C4","16n"],["D4","16n"],["E4","16n"],["G4","16n"],["B4","16n"],["C5","16n"]],
  [["D4","16n"],["E4","16n"],["G4","16n"],["B4","16n"],["C5","16n"],["D5","16n"]],
  
  // ii11 chord arp, in 6s
  // D4,F4,A4,C5,D5,E5,G5,
  
  [["D4","8n"],["F4","8n"],["A4","8n"],["C5","8n"],["D5","8n"],["E5","8n"]],
  [["F4","8n"],["A4","8n"],["C5","8n"],["D5","8n"],["E5","8n"],["G5","8n"]],
  [["D4","16n"],["F4","16n"],["A4","16n"],["C5","16n"],["D5","16n"],["E5","16n"]],
  [["F4","16n"],["A4","16n"],["C5","16n"],["D5","16n"],["E5","16n"],["G5","16n"]],


]

const UpwardRuns = [
  // in the context of a D-11
  /// Blues D-11:
  // D4,F4,G4,Ab4,A4,C5,
  [['F3','8n'],['Ab3','8n'],['A3','8n'],['C4','8n'],['D4','8n'],['F4','8n']],
  [['G3','8n'],['Ab3','8n'],['A3','8n'],['C4','8n'],['D4','8n'],['F4','8n']],
  [['Ab3','8n'],['A3','8n'],['C4','8n'],['D4','8n'],['F4','8n'],['G4','8n']],
  [['A3','8n'],['C4','8n'],['D4','8n'],['F4','8n'],['G4','8n'],['Ab4','8n']],
  [['C4','8n'],['D4','8n'],['F4','8n'],['G4','8n'],['Ab4','8n'],['A4','8n']],
  [['D4','8n'],['F4','8n'],['G4','8n'],['Ab4','8n'],['A4','8n'],['C5','8n']],
  
  [['F3','16n'],['Ab3','16n'],['A3','16n'],['C4','16n'],['D4','16n'],['F4','16n']],
  [['G3','16n'],['Ab3','16n'],['A3','16n'],['C4','16n'],['D4','16n'],['F4','16n']],
  [['Ab3','16n'],['A3','16n'],['C4','16n'],['D4','16n'],['F4','16n'],['G4','16n']],
  [['A3','16n'],['C4','16n'],['D4','16n'],['F4','16n'],['G4','16n'],['Ab4','16n']],
  [['C4','16n'],['D4','16n'],['F4','16n'],['G4','16n'],['Ab4','16n'],['A4','16n']],
  [['D4','16n'],['F4','16n'],['G4','16n'],['Ab4','16n'],['A4','16n'],['C5','16n']],

  /// Bebop Minor D-11. The key notes are every other. So we shift it accordingly too.:
  // D4,E4,F4,Gb4,G4,A4,B4,C5,
  // full scale quick run
  [['F3','16n'],['Gb3','16n'],['G3','16n'],['A3','16n'],['B3','16n'],['C4','16n'],['D4','16n'],['E4','16n']],
  [['G3','16n'],['A3','16n'],['B3','16n'],['C4','16n'],['D4','16n'],['E4','16n'],['F4','16n'],['Gb4','16n']],
  [['B3','16n'],['C4','16n'],['D4','16n'],['E4','16n'],['F4','16n'],['Gb4','16n'],['G4','16n'],['A4','16n']],
  [['D4','16n'],['E4','16n'],['F4','16n'],['Gb4','16n'],['G4','16n'],['A4','16n'],['B4','16n'],['C5','16n']],
  // part scale runs
  [['F3','16n'],['Gb3','16n'],['G3','16n'],['A3','16n'],['B3','16n'],['C4','16n']],
  [['G3','16n'],['A3','16n'],['B3','16n'],['C4','16n'],['D4','16n'],['E4','16n']],
  [['B3','16n'],['C4','16n'],['D4','16n'],['E4','16n'],['F4','16n'],['Gb4','16n']],
  [['D4','16n'],['E4','16n'],['F4','16n'],['Gb4','16n'],['G4','16n'],['A4','16n']],
  
  [['F3','8n'],['Gb3','8n'],['G3','8n'],['A3','8n'],['B3','8n'],['C4','8n']],
  [['G3','8n'],['A3','8n'],['B3','8n'],['C4','8n'],['D4','8n'],['E4','8n']],
  [['B3','8n'],['C4','8n'],['D4','8n'],['E4','8n'],['F4','8n'],['Gb4','8n']],
  [['D4','8n'],['E4','8n'],['F4','8n'],['Gb4','8n'],['G4','8n'],['A4','8n']],
  
  
]

function reverseLineCollection(collection) {
  const reversal = JSON.parse(JSON.stringify(collection))
  reversal.forEach(line => line.reverse())
  return reversal
}

const ReversedShortBluesLicks = reverseLineCollection(ShortBluesLicks)
const ReversedTurnarounds = reverseLineCollection(Turnarounds)
const DownwardArpeggios = reverseLineCollection(UpwardArpeggios)
const DownwardRuns = reverseLineCollection(UpwardRuns)

const Rests = [
  // [[0, "16n"]], // too crooked
  [[0, "8n"]],
  // [[0, "8n."]],
  [[0, "4n"]],
  [[0, "4n."]],
  [[0, "2n"]],
  [[0, "2n."]],
]

// TODO patterns

/// NOTE: 8t 8t 8t == 8n 8n == 4n


// NOTE : with the looping shifting, no need for rest blocks

const LineBank = {
  LongBluesLicks,
  ShortBluesLicks,
  ShortLicks,
  Turnarounds,
  ReversedShortBluesLicks,
  ReversedTurnarounds,
  UpwardArpeggios,
  UpwardRuns,
  DownwardArpeggios,
  DownwardRuns,
  Rests,
}

// FIXME bad naming
const LineBankGroups = [
  ["LongBluesLicks", "#147eff"],
  ["ShortBluesLicks", "#3ba7f6"],
  ["ReversedShortBluesLicks", "#3ba7f6"],
  ["Turnarounds", "#45699f"],
  ["ReversedTurnarounds", "#45699f"],
  ["ShortLicks", "#f69393"],
  ["UpwardArpeggios", "#f693f0"],
  ["UpwardRuns", "#f6dc93"],
  ["DownwardArpeggios", "#f693f0"],
  ["DownwardRuns", "#f6dc93"],
  ["Rests", "#999999"],
]
