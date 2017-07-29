<template>
  <div>
    <div class="tabs is-centered is-boxed">
      <ul>
        <li
          v-on:click="changeTab('scale')"
          v-bind:class="[ selectedTab === 'scale' ? 'is-active' : null ]">
          <a>Scales</a>
        </li>
        <li
          v-on:click="changeTab('chord')"
          v-bind:class="[ selectedTab === 'chord' ? 'is-active' : null ]">
          <a>Chords</a>
        </li>
      </ul>
    </div>

    <div class="controls" v-show="isTabScale">
      <div class="select">
        <select v-model="selectedScaleRoot">
          <option disabled value="">Root</option>
          <option v-for="root in scaleRoots" v-bind:value="root">{{ root }}</option>
        </select>
        <div class="select__border"></div>
      </div>

      <div class="select">
        <select v-model="selectedScaleType">
          <option disabled value="">Type</option>
          <option v-for="type in scaleTypes" v-bind:value="type.value">{{ type.name }}</option>
        </select>
        <div class="select__border"></div>
      </div>
    </div>

    <div class="controls" v-show="isTabChord">
      <div class="select">
        <select v-model="selectedChordRoot">
          <option disabled value="">Root</option>
          <option v-for="root in chordRoots" v-bind:value="root">{{ root }}</option>
        </select>
        <div class="select__border"></div>
      </div>

      <div class="select">
        <select v-model="selectedChordType">
          <option disabled value="">Type</option>
          <option v-for="type in chordTypes" v-bind:value="type.value">{{ type.name }}</option>
        </select>
        <div class="select__border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { NOTE_MAP, SCALE, CHORD } from 'API/constants';

export default {
  data() {
    return {
      scaleRoots: Object.keys(NOTE_MAP),
      chordRoots: Object.keys(NOTE_MAP),
    };
  },

  computed: {
    ...mapGetters([
      'selectedChord',
      'selectedScale',
      'selectedTab',
    ]),

    isTabScale() {
      return this.selectedTab === 'scale';
    },

    isTabChord() {
      return this.selectedTab === 'chord';
    },

    scaleTypes() {
      const scaleNames = Object.keys(SCALE);
      const formattedNames = scaleNames.map(this.snakeToSpaceCase).map(this.toTitleCase);

      return scaleNames.map((value, index) => ({
        value,
        name: formattedNames[index],
      }));
    },

    chordTypes() {
      const chordNames = Object.keys(CHORD);
      const formattedNames = chordNames.map(this.snakeToSpaceCase).map(this.toTitleCase);

      return chordNames.map((value, index) => ({
        value,
        name: formattedNames[index],
      }));
    },

    selectedScaleRoot: {
      get() {
        return this.selectedScale.root;
      },
      set(root) {
        const { type } = this.selectedScale;
        this.changeStringState({ root, type });
      },
    },

    selectedScaleType: {
      get() {
        return this.selectedScale.type;
      },
      set(type) {
        const { root } = this.selectedScale;
        this.changeStringState({ root, type });
      },
    },

    selectedChordRoot: {
      get() {
        return this.selectedChord.root;
      },
      set(root) {
        const { type } = this.selectedChord;
        this.changeStringState({ root, type });
      },
    },

    selectedChordType: {
      get() {
        return this.selectedChord.type;
      },
      set(type) {
        const { root } = this.selectedChord;
        this.changeStringState({ root, type });
      },
    },
  },

  methods: {
    ...mapMutations([
      'changeStringState',
      'changeTab',
    ]),

    snakeToSpaceCase(str) {
      return str.split('_').join(' ');
    },

    toTitleCase(str) {
      return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1));
    },
  },
};
</script>

<style lang="scss">
  @import '../styles/components/tabs';
  @import '../styles/components/dropdown';
  @import '../styles/components/controls';
</style>
