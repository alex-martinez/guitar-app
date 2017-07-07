// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from 'Components/App';
import store from './store/';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
