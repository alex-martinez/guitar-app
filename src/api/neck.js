import { tunings } from './constants';
import { notesAtTonic } from './utilities';

export function createNoteSettings(allStrings) {
  return allStrings.map(
    string => string.map(note => ({
      note,
      selected: false,
      root: false,
    })),
  );
}

export function createNeck(stringRootNotes = tunings.Standard, extraFrets = 3) {
  const strings = stringRootNotes.map(
    (rootNote) => {
      const stringNotes = notesAtTonic(rootNote);

      return [
        ...stringNotes,
        ...stringNotes.slice(0, extraFrets),
      ];
    },
  );

  return createNoteSettings(strings);
  // return strings;
}
