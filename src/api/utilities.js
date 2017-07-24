import { NOTE_MAP } from 'API/constants';

export const getNormalizedNote = (note) => {
  switch (note) {
    case 'A#': return 'Bb';
    case 'Cb': return 'B';
    case 'B#': return 'C';
    case 'Db': return 'C#';
    case 'D#': return 'Eb';
    case 'Fb': return 'E';
    case 'E#': return 'F';
    case 'Gb': return 'F#';
    case 'Ab': return 'G#';
    default: return note;
  }
};

export const getScaleDegree = (root, note) => {
  const n1 = getNormalizedNote(root);
  const n2 = getNormalizedNote(note);
  const offset = NOTE_MAP[n2] - NOTE_MAP[n1];
  return offset < 0 ? 12 + offset : offset;
};

// eslint-disable-next-line arrow-body-style
export const getStringState = (tuning, root, scaleDegrees = []) => {
  return tuning.map((openStringNote) => {
    const offset = getScaleDegree(root, openStringNote);
    const activeFrets = [];

    for (let fret = 0; fret < 15; fret++) {
      const scaleDegree = (fret + offset) % 12;
      activeFrets.push({
        isRoot: scaleDegree === 0,
        isSelected: scaleDegrees.includes(scaleDegree),
      });
    }

    return activeFrets;
  });
};
