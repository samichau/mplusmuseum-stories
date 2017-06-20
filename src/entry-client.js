import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import Clipboard from 'vue-clipboards';
import 'es6-promise/auto';
import 'objectFitPolyfill';
import { createApp } from './app';
import locales from './locale';
import { setTitleClient } from './util/meta';
import ProgressBar from './components/ProgressBar.vue';
import Modal from './components/Modal.vue';

// Global progress bar vue instance
Vue.prototype.$bar = new Vue(ProgressBar).$mount();
const bar = Vue.prototype.$bar;
document.body.appendChild(bar.$el);

// Global modal dialog vue instance
Vue.prototype.$modal = new Vue(Modal).$mount();
const modal = Vue.prototype.$modal;
document.body.appendChild(modal.$el);

// A global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    // IF component has no asyncData property OR just language change
    // OR just a hash change THEN no async necessary
    if (!asyncData
      || to.params.lang !== from.params.lang
      || (to.hash !== from.hash && to.path === from.path)) {
      next();
    } else {
      bar.start();
      asyncData({ store: this.$store, route: to })
        .then(() => {
          bar.finish();
          next();
        }).catch((error) => {
          console.log(error);
          // @TODO Show Modal
          // modal.show('Something!');
          bar.finish();
        });
    }
  },
});

const { app, router, store } = createApp();

// Use clipboard
Vue.use(Clipboard);

// Use analytics
if (process.env.ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router,
  });
}

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const prevLang = from.params.lang;
    const newLang = to.params.lang;
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) =>
      diffed || (diffed = (prevMatched[i] !== c)));
    // Update language state if this route has a different recognized locale
    // e.g. example.com/en/page/ => example.com/de/page/
    if (newLang !== prevLang && locales.includes(newLang)) {
      store.commit('setLanguage', { primary: newLang, secondary: prevLang });
      setTitleClient(to.matched[0].instances.default);
    }
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    // if (!activated.length) {
    if (!asyncDataHooks.length) {
      return next();
    }
    bar.start();
    // Promise.all(activated.map((component) => {
    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish();
        next();
      }).catch((error) => {
        console.log(error);
        // @TODO Show Modal
        // modal.show('Something!');
        bar.finish();
      });
  });

  // actually mount to DOM
  app.$mount('#app');
});

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
