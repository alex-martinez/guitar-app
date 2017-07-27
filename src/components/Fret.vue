<template>
  <div
    v-bind:class="['neck-fret', `neck-fret--${this.fretIndex}`, classList]">
    <div class="neck-note">{{ fretNote }}</div>
    <div
      v-if="isNumberedString"
      class="neck-fret__number">
      {{ fretIndex }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { NOTE_MAP } from 'API/constants';

export default {
  props: {
    fretIndex: Number,
    fretSettings: Object,
    stringIndex: Number,
  },

  computed: {
    ...mapGetters([
      'tuning',
    ]),

    isNumberedString() {
      return this.stringIndex === 5;
    },

    classList() {
      return {
        'neck-fret--selected': this.fretSettings.isSelected,
        'neck-fret--root': this.fretSettings.isRoot,
        'neck-fret--indicator': this.isIndicatorFret || this.isOctaveIndicator,
      };
    },

    /**
     * Based on the fret and string index, determine the note of that fret
     * @param  {Number} fretIndex
     * @param  {Number} stringIndex
     * @return {String}
     */
    fretNote() {
      const stringRoot = this.tuning[this.stringIndex];
      const rootIndex = this.notes.indexOf(stringRoot);
      return this.notes[(rootIndex + this.fretIndex) % 12];
    },

    isIndicatorFret() {
      return [3, 5, 7, 9, 12].indexOf(this.fretIndex % 12) > -1 && this.stringIndex === 2;
    },

    isOctaveIndicator() {
      return this.fretIndex === 12 && [1, 3].indexOf(this.stringIndex) > -1;
    },
  },

  data() {
    return {
      notes: Object.keys(NOTE_MAP),
    };
  },
};
</script>
