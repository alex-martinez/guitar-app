<template>
  <div class="neck">
    <div
      v-for="(string, stringIndex) in strings"
      class="neck-string"
      v-bind:class="[ `neck-string--${stringNumber(stringIndex)}` ]"
      v-bind:key="stringIndex">
      <Fret
        v-for="(fretSettings, fretIndex) in string"
        v-bind:key="stringIndex"
        v-bind:fret-settings="fretSettings"
        v-bind:string-index="stringIndex"
        v-bind:fret-index="fretIndex">
      </Fret>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Fret from 'Components/Fret';

export default {
  components: {
    Fret,
  },

  computed: {
    ...mapGetters([
      'strings',
    ]),
  },

  methods: {
    stringNumber(index) {
      return 6 - index;
    },
  },
};
</script>

<style lang="scss">
  @import '../styles/components/neck';
</style>
