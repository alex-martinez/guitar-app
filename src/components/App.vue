<template>
  <div id="app">
    <controls></controls>
    <neck></neck>
  </div>
</template>

<script>
import Neck from 'Components/Neck';
import Controls from 'Components/Controls';

export default {
  components: {
    Controls,
    Neck,
  },
};
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
