/* eslint-disable */
import { ALL_NOTES } from './constants';

// Returns an array with the tonic being index 0
// Used to reconfigure ALL_NOTES with the array starting at the `tonic`
// E.g. notesAtTonic('D') will return ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', ]
export function notesAtTonic(tonic) {
  const tonicIndex = ALL_NOTES.indexOf(tonic);

  return [
    ...ALL_NOTES.slice(tonicIndex), // slice tonicIndex to end
    ...ALL_NOTES.slice(0, tonicIndex), // slice from beginning to tonicIndex
  ];
}

// Comb through neck for any notes in arrNotes. If there, make selected: true
export function filterForNotes(neck, arrNotes) {
  return neck.map(string =>
    // Map over string to find notes in arrNotes
    string.map((fret) => {
      // fret = {note: "A", selected: false, ...}
      // If fret.note is in arrNotes, selected = true. Else selected = false
      // fret.selected = arrNotes.indexOf(fret.note) > -1 ? true : false;
      // return fret;

      return arrNotes.indexOf(fret) > -1 ? fret : '';
    }),
  );
}
