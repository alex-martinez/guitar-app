import { createNeck } from 'API/neck';
import { tunings } from 'API/constants';
import scales from 'API/scales';
import { findChordNotes } from 'API/chords';

const state = {
  selectedScaleRoot: '',
  selectedScaleType: '',
  selectedChordRoot: '',
  selectedChordType: '',
  strings: [],
};

const actions = {
  getStrings({ commit }, tuning = tunings.standard) {
    commit('updateStrings', tuning);
  },

  /**
   * placement: {
   *   string: <Number>
   *   fret: <Number>
   * }
   */
  toggleSelected({ commit }, placement) {
    commit('toggleSelected', placement);
  },

  updateSelectedScaleRoot({ commit, state }, root = '') {
    commit('updateSelectedScaleRoot', root);

    if (state.selectedScaleRoot && state.selectedScaleType) {
      const scaleNotes = scales[state.selectedScaleType][state.selectedScaleRoot.toLowerCase()];
      commit('filterStrings', scaleNotes);
    } else {
      commit('filterStrings');
    }
  },

  updateSelectedScaleType({ commit, state }, scaleType = '') {
    commit('updateSelectedScaleType', scaleType);

    if (state.selectedScaleRoot && state.selectedScaleType) {
      const scaleNotes = scales[state.selectedScaleType][state.selectedScaleRoot.toLowerCase()];
      commit('filterStrings', scaleNotes);
    } else {
      commit('filterStrings');
    }
  },

  updateSelectedChordRoot({ commit, state }, root = '') {
    commit('updateSelectedChordRoot', root);

    if (state.selectedChordRoot && state.selectedChordType) {
      const notesArr = findChordNotes(state.selectedChordRoot, state.selectedChordType);
      commit('filterStrings', notesArr);
    } else {
      commit('filterStrings');
    }
  },

  updateSelectedChordType({ commit, state }, type = '') {
    commit('updateSelectedChordType', type);

    if (state.selectedChordRoot && state.selectedChordType) {
      const notesArr = findChordNotes(state.selectedChordRoot, state.selectedChordType);
      commit('filterStrings', notesArr);
    } else {
      commit('filterStrings');
    }
  },

  resetSelected({ commit }) {
    commit('updateSelectedScaleRoot', '');
    commit('updateSelectedScaleType', '');
    commit('updateSelectedChordRoot', '');
    commit('updateSelectedChordType', '');
    commit('filterStrings');
  },
};

const getters = {
  strings: state => state.strings,
};

const mutations = {
  updateStrings(state, tuning) {
    state.strings = createNeck(tuning);
  },

  /**
   * placement: {
   *   string: <Number>
   *   fret: <Number>
   *   isSelected: <Boolean>
   * }
   */
  toggleSelected(state, placement) {
    const { string, fret, isSelected } = placement;

    // If placement.isSelected is passed, use that as the value
    if (isSelected) {
      state.strings[string][fret].selected = isSelected;
      return;
    }

    // Else toggle the fret's selected state
    state.strings[string][fret].selected = !state.strings[string][fret].selected;
  },

  updateSelectedScaleRoot(state, root = '') {
    state.selectedScaleRoot = root;
  },

  updateSelectedScaleType(state, type = '') {
    state.selectedScaleType = type;
  },

  updateSelectedChordRoot(state, root = '') {
    state.selectedChordRoot = root;
  },

  updateSelectedChordType(state, type = '') {
    state.selectedChordType = type;
  },

  /**
   * Filter through the whole neck for notes, and turn those notes to selected
   * @param  {Array} notes  Array of notes to be found
   */
  filterStrings(state, notes = []) {
    state.strings = state.strings.map(string =>
      string.map((fret) => {
        // fret = {note: "A", selected: false, ...}
        fret.selected = notes.indexOf(fret.note) > -1;
        fret.root = fret.note === notes[0];

        return fret;
      }),
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
