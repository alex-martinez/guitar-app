import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'Plugins/logger';
import { state, getters, mutations } from 'Store/store';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
