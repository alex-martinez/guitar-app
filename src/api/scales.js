import { notesAtTonic } from './utilities';

const MAJOR = 'major';
const MINOR = 'minor';

const scaleFormulas = {
  [MAJOR]: [0, 2, 4, 5, 7, 9, 11], // w w h w w w (Ionian)
  [MINOR]: [0, 2, 3, 5, 7, 8, 10], // w h w w h w (Aeolian)
};

// Returns Array of all notes in a scale
function getScale(tonic, scaleFormula = scaleFormulas.major) {
  const tonicNotes = notesAtTonic(tonic);
  const scale = [];

  // Use formula to get notes in a scale
  for (let i = 0; i < scaleFormula.length; i++) {
    scale.push(tonicNotes[scaleFormula[i]]);
  }

  return scale;
}

const scales = {
  [MAJOR]: {
    c: getScale('C', scaleFormulas[MAJOR]), // All naturals
    d: getScale('D', scaleFormulas[MAJOR]),
    e: getScale('E', scaleFormulas[MAJOR]),
    f: getScale('F', scaleFormulas[MAJOR]),
    g: getScale('G', scaleFormulas[MAJOR]),
    a: getScale('A', scaleFormulas[MAJOR]),
    b: getScale('B', scaleFormulas[MAJOR]),
  },
  [MINOR]: {
    c: getScale('C', scaleFormulas[MINOR]),
    d: getScale('D', scaleFormulas[MINOR]),
    e: getScale('E', scaleFormulas[MINOR]),
    f: getScale('F', scaleFormulas[MINOR]),
    g: getScale('G', scaleFormulas[MINOR]),
    a: getScale('A', scaleFormulas[MINOR]), // All naturals
    b: getScale('B', scaleFormulas[MINOR]),
  },
};

export default scales;
