<template>
  <div class="neck">
    <div
      v-for="(string, stringIndex) in strings"
      class="neck-string"
      v-bind:class="[ `neck-string--${stringIndex}` ]"
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
};
</script>

<style lang="scss">
  $body-bg: #f5f6f8;
  $neck-border-color: #221e1f;
  $z1: 10;
  $z2: 20;
  $z3: 30;
  $primary: #221e1f;
  $selected: yellow;
  $root: red;

  body {
    background-color: $body-bg;
    margin: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .neck {
    width: 95%;
    height: 250px;
    border-right: 1px solid $neck-border-color;
    margin: 0 auto;

    display: flex;
    align-items: stretch;
    flex-wrap: wrap-reverse; // Reverse to show in the correct order

    &-string {
      width: 100%;
      position: relative;
      display: flex;

      // String
      &:before {
        content: "";
        display: block;
        width: 100%;
        border-top: 1px solid $neck-border-color;
        position: absolute;
        top: 50%;
      }

      // Hide excess border lengths of .neck and .neck-string
      &:first-child:after,
      &:last-child:after {
        content: "";
        display: block;
        width: 101%;
        height: 50%;
        background-color: $body-bg;
        position: absolute;
        left: -1px;
      }

      &:first-child:after {bottom: -1px;}
      &:last-child:after {top: 0;}
    }

    &-fret {
      flex: 1 0 0;
      border-left: 1px solid $neck-border-color;
      position: relative;
      cursor: pointer;

      &--0 {
        border-left: none;
        background-color: $body-bg;
        max-width: 50px;

        &:before {
          display: none;
        }
      }

      &--1 {
        border-left-width: 4px;
      }

      // Selected circle, hidden by default
      &:before {
        content: "";
        display: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $selected;
        border: 1px solid #000;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: $z2;
      }

      // Show on hover
      &:hover:before {
        display: block;
        opacity: .5;
      }

      // Show if selected
      &--selected:before,
      &--selected:hover:before {
        display: block;
        opacity: 1;
      }

      &--root:before {
        background-color: $root;
      }
    }

    &-note {
      z-index: $z3;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    // Background color used for text contrast
    .neck-fret:not(.neck-fret--selected):not(:hover) .neck-note {
      background-color: $body-bg;
    }
  }
</style>
