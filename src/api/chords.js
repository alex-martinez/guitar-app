import { notesAtTonic } from './utilities';

// 0   1   2   3   4   5   6   7   8   9   10   11
// C,  C#, D,  D#, E,  F,  F#, G,  G#, A,  A#,  B
// D,  D#, E,  F,  F#, G,  G#, A,  A#, B,  C,   C#
// E,  F,  F#, G,  G#, A,  A#, B,  C,  C#, D,   D#

// C Major: C, E,  G (0, 4, 7)
// D Major: D, F#, A (0, 4, 7)
// E Major: E, G#, B (0, 4, 7)

// C minor: C, D#, G (0, 3, 7)
// D minor: D, F,  A (0, 3, 7)
// E minor: E, G,  B (0, 3, 7)

// Chord formulas relative to their scales
export const chordFormulas = [
  {
    type: 'major',
    formula: [0, 4, 7],
  },
  {
    type: 'minor',
    formula: [0, 3, 7],
  },
  {
    type: 'major 7',
    formula: [0, 4, 7, 11],
  },
  {
    type: '7',
    formula: [0, 4, 7, 10],
  },
  {
    type: 'minor 7',
    formula: [0, 3, 7, 10],
  },
  {
    type: 'diminished 7',
    formula: [0, 3, 6, 9],
  },
];

// Argument: Takes array of notes, max of 6 total (there's only 6 strings)
// 1. Remove duplicate notes
// 2. Reorder ALL_NOTES with tonic being first in array
// 3. Find formula by getting indexOf of notes in updated ALL_NOTES and reorder
//    sequentially (tonic should always be 0)
// 4. Iterate over chordFormulas to find chord type (major, minor, major 7, etc.)
// 5. Tonic dictates the name of the chord
// 6. Return one object
export function findChordType(arrNotes = ['E', 'B', 'E', 'G#', 'B', 'E']) {
  // 1. Remove duplicate notes
  const unique = arrNotes.reduce((arr, note) => {
    const notes = arr.indexOf(note) === -1 ? [...arr, note] : arr;

    return notes;
  }, []);

  // 2. Reorder ALL_NOTES with tonic being first in array
  const allNotes = notesAtTonic(arrNotes[0]);

  // 3. Find formula by getting indexOf of notes in updated ALL_NOTES and reorder sequentially
  function getUniques(arr, curr) {
    const index = allNotes.indexOf(curr);

    return index !== -1 ? [...arr, index] : arr;
  }

  const formula = unique.reduce(getUniques, []).sort((a, b) => a > b);

  // 4. Iterate over chordFormulas to find chord type (major, minor, major 7, etc.)
  const chordType = chordFormulas.filter(
    obj => obj.formula.join('') === formula.join(''),
  )[0];

  return chordType;
}

export function findChordNotes(root, type) {
  const allNotes = notesAtTonic(root);
  const chordFormulaObj = chordFormulas.find(formula => formula.type === type);

  return chordFormulaObj.formula.map(noteIndex => allNotes[noteIndex]);
}
