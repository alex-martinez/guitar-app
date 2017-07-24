<template>
  <div
    v-bind:class="['neck-fret', `neck-fret--${this.fretIndex}`, classList]">
    <div class="neck-note">{{ fretNote }}</div>
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

    classList() {
      return {
        'neck-fret--selected': this.fretSettings.isSelected,
        'neck-fret--root': this.fretSettings.isRoot,
      };
    },

    fretNote() {
      const stringRoot = this.tuning[this.stringIndex];
      const rootIndex = this.notes.indexOf(stringRoot);
      return this.notes[(rootIndex + this.fretIndex) % 12];
    },
  },

  data() {
    return {
      notes: Object.keys(NOTE_MAP),
    };
  },

  methods: {
    fretNote(fretIndex, stringIndex) {
      const stringRoot = this.tuning[stringIndex];
      const rootIndex = this.notes.indexOf(stringRoot);
      return this.notes[(rootIndex + fretIndex) % 12];
    },
  },
};
</script>
