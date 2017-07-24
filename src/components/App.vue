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
