import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';

// Returns a placeholder SVG with a matching apsect ratio
Vue.prototype.$placeholder = (dimensions, type = 'loading', fill = '#ddd', color = '#aaa') => {
  const aspect = dimensions.height / dimensions.width;
  const width = 3000;
  const height = width * aspect;
  const radius = 10;
  let obj = '';
  if (type === 'error') {
    const lineWidth = radius * 2;
    // const lineLength = radius * 5;
    obj = `<line x1='${(width / 2)}' x2='${(width / 2)}' y1='${(height / 2) - (lineWidth * 3)}' y2='${(height / 2) + (lineWidth * 1)}' style='stroke:${color};stroke-width:${lineWidth}' /><line x1='${(width / 2)}' x2='${(width / 2)}' y1='${(height / 2) + (lineWidth * 2)}' y2='${(height / 2) + (lineWidth * 3)}' style='stroke:${color};stroke-width:${lineWidth}' /><circle r='${lineWidth * 5}' cy='${height / 2}' cx='${(width / 2)}' fill='transparent' style='stroke:${color};stroke-width:${lineWidth * 0.75}'/>`;
  } else {
    obj = `<circle r='${radius}' cy='${height / 2}' cx='${(width / 2) - (radius * 3)}' fill='${color}'/>
    <circle r='${radius}' cy='${height / 2}' cx='${width / 2}' fill='${color}'/><circle r='${radius}' cy='${height / 2}' cx='${(width / 2) + (radius * 3)}' fill='${color}'/>`;
  }
  const str = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'><rect width='${width}' height='${height}' y='0' x='0' fill='${fill}'/>${obj}</svg>`;
  const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`;
  return encoded;
};

const placeholder = Vue.prototype.$placeholder;

// Use lazyload
Vue.use(VueLazyload, {
  preLoad: 2.2,
  error: placeholder({
    width: 800,
    height: 500,
  }, 'error', '#ddd', 'red'),
  loading: false,
  attempt: 1,
  supportWebp: false,
});

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // Translation helper functions
  Vue.prototype.$t = val => ((val && typeof val === 'object') ? val[store.state.lang] : '');
  Vue.prototype.$tt = val => ((val && typeof val === 'object') ? val[store.state.langSecondary] : '');

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store };
}
