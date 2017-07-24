import { TUNING, CHORD, SCALE } from 'API/constants';
import { getStringState } from 'API/utilities';

export const state = {
  chord: {
    root: 'C',
    type: 'major',
  },
  scale: {
    root: 'C',
    type: 'major',
  },
  tuning: TUNING.standard,
  tab: 'scale',
};

export const getters = {
  selectedTab: state => state.tab,

  selectedChord: state => state.chord,

  selectedScale: state => state.scale,

  strings: ({ tab, tuning, scale, chord }) => {
    const scaleDegrees = tab === 'scale' ? SCALE[scale.type] : CHORD[chord.type];
    const root = tab === 'scale' ? scale.root : chord.root;

    return getStringState(tuning, root, scaleDegrees);
  },

  tuning: state => state.tuning,
};

export const mutations = {
  changeStringState(state, { root, type }) {
    state[state.tab] = { root, type };
  },

  changeTab(state, tab) {
    state.tab = tab;
  },
};
