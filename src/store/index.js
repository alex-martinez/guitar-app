import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'Plugins/logger';
import neck from 'Modules/neck';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    neck,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
