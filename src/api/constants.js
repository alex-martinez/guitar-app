export const TUNING = {
  standard: ['E', 'A', 'D', 'G', 'B', 'E'],
  drop_d: ['D', 'A', 'D', 'G', 'B', 'E'],
  double_drop_d: ['D', 'A', 'D', 'G', 'B', 'D'],
  d_modal_tuning: ['D', 'A', 'D', 'G', 'A', 'D'],
  dropped_c: ['C', 'G', 'C', 'F', 'A', 'D'],
};

export const NOTE_MAP = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'Bb': 10,
  'B': 11,
};

export const SCALE = {
  major: [0, 2, 4, 5, 7, 9, 11], // Ionian
  major_pentatonic: [0, 2, 4, 7, 9],
  natural_minor: [0, 2, 3, 5, 7, 8, 10], // Aeolian
  minor_pentatonic: [0, 3, 5, 7, 10],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
  blues_pentatonic: [0, 3, 5, 6, 7, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

export const CHORD = {
  major: [0, 4, 7],
  major_7: [0, 4, 7, 11],
  minor: [0, 3, 7],
  minor_7: [0, 3, 7, 10],
};
