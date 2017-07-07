<template>
  <div class="controls">
    <div class="select">
      <select v-model="selectedScaleRoot">
        <option disabled value="">Root note</option>
        <option v-for="root in scaleRoots" v-bind:value="root">{{ root }}</option>
      </select>
    </div>

    <div class="select">
      <select v-model="selectedScaleType">
        <option disabled value="">Scale type</option>
        <option v-for="type in scaleTypes" v-bind:value="type">{{ type }}</option>
      </select>
    </div>

    <div class="select">
      <select v-model="selectedChordRoot">
        <option disabled value="">Chord root note</option>
        <option v-for="root in chordRoots" v-bind:value="root">{{ root }}</option>
      </select>
    </div>

    <div class="select">
      <select v-model="selectedChordType">
        <option disabled value="">Chord type</option>
        <option v-for="type in chordTypes" v-bind:value="type">{{ type }}</option>
      </select>
    </div>

    <button v-on:click="resetSelected" type="reset">Reset</button>
  </div>
</template>

<script>
import scales from 'API/scales';
import { ALL_NOTES } from 'API/constants';
import { chordFormulas } from 'API/chords';

export default {
  data() {
    return {
      scaleRoots: ALL_NOTES,
      scaleTypes: Object.keys(scales),
      chordRoots: ALL_NOTES,
      chordTypes: chordFormulas.map(chordFormula => chordFormula.type),
    };
  },

  computed: {
    selectedScaleRoot: {
      get() {
        return this.$store.state.neck.selectedScaleRoot;
      },
      set(value) {
        this.$store.dispatch('neck/updateSelectedScaleRoot', value);
      },
    },

    selectedScaleType: {
      get() {
        return this.$store.state.neck.selectedScaleType;
      },
      set(value) {
        this.$store.dispatch('neck/updateSelectedScaleType', value);
      },
    },

    selectedChordRoot: {
      get() {
        return this.$store.state.neck.selectedChordRoot;
      },
      set(value) {
        this.$store.dispatch('neck/updateSelectedChordRoot', value);
      },
    },

    selectedChordType: {
      get() {
        return this.$store.state.neck.selectedChordType;
      },
      set(value) {
        this.$store.dispatch('neck/updateSelectedChordType', value);
      },
    },
  },

  methods: {
    resetSelected() {
      this.$store.dispatch('neck/resetSelected');
    },
  },
};
</script>

<style lang="scss">
  .controls {
    background-color: #2b2e52;
    margin-bottom: 60px;
    height: 50px;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  .select {
    $arrow-size: 8px;
    display: flex;
    position: relative;
    border-left: 1px solid #444760;
    border-right: 1px solid #444760;
    margin-left: -1px;

    &:after {
      content: "";
      display: block;
      width: $arrow-size;
      height: $arrow-size;
      transform: rotate(45deg);
      transform-origin: 50% 0 0;
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      margin: auto;
    }

    select {
      font-size: 16px;
      appearance: none;
      background-color: transparent;
      color: #fff;
      border-radius: 0;
      border: none;
      padding-left: 10px;
      padding-right: $arrow-size + 26;
    }
  }
</style>
