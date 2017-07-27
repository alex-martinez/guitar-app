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
      </div>

      <div class="select">
        <select v-model="selectedScaleType">
          <option disabled value="">Type</option>
          <option v-for="type in scaleTypes" v-bind:value="type.value">{{ type.name }}</option>
        </select>
      </div>
    </div>

    <div class="controls" v-show="isTabChord">
      <div class="select">
        <select v-model="selectedChordRoot">
          <option disabled value="">Root</option>
          <option v-for="root in chordRoots" v-bind:value="root">{{ root }}</option>
        </select>
      </div>

      <div class="select">
        <select v-model="selectedChordType">
          <option disabled value="">Type</option>
          <option v-for="type in chordTypes" v-bind:value="type.value">{{ type.name }}</option>
        </select>
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
  .tabs {
    -webkit-overflow-scrolling: touch;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    align-items: stretch;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
  }

  .tabs a {
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    color: #4a4a4a;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-bottom: -1px;
    padding: 0.5em 1em;
    vertical-align: top;
  }

  .tabs a:hover {
    border-bottom-color: #363636;
  }

  .tabs li {
    display: block;
    margin: 0 5px;
  }

  .tabs li.is-active a {
    border-bottom-color: #00d1b2;
    color: #5f98fc;
  }

  .tabs ul {
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }

  .tabs ul.is-center {
    flex: none;
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
  }

  .tabs.is-centered ul {
    justify-content: center;
  }

  .tabs.is-boxed a {
    border: 1px solid transparent;
    border-radius: 3px 3px 0 0;
  }

  .tabs.is-boxed a:hover {
    background-color: #fff;
    border-color: #dbdbdb;
  }

  .tabs.is-boxed li.is-active a {
    background-color: #f5f6f8;
    border-color: #dbdbdb;
    border-bottom-color: transparent !important;
  }

  .controls {
    padding: 15px;
    margin-bottom: 70px;
    height: 50px;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  .select {
    $arrow-size: 8px;
    display: flex;
    position: relative;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    margin-right: 20px;
    border-radius: 5px;
    height: 40px;

    &:last-child {
      margin-right: 0;
    }

    &:after {
      content: "";
      display: block;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      margin: auto;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #2c3e50;
      width: 0;
      height: 0;
    }

    select {
      color: #2c3e50;
      font-size: 16px;
      appearance: none;
      background-color: transparent;
      border-radius: 0;
      border: none;
      padding-left: 10px;
      padding-right: $arrow-size + 26;
    }
  }
</style>
