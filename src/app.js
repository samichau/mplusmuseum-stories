import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueLazyload from 'vue-lazyload';
import _ from 'lodash';
import { createStore } from './store';
import { createRouter } from './router';

// Plugins
import Placeholder from './plugins/placeholder';

// Global Components
import App from './App.vue';
import AppBanner from './components/AppBanner.vue';
import AppPanel from './components/AppPanel.vue';
import AppTitle from './components/AppTitle.vue';
import AppTitleLink from './components/AppTitleLink.vue';
import AppSectionLabel from './components/AppSectionLabel.vue';
import BlockText from './components/BlockText.vue';
import TagGroup from './components/TagGroup.vue';
import TagSingle from './components/TagSingle.vue';

// Plugins
Vue.use(Placeholder);
Vue.use(VueLazyload, {
  preLoad: 2.2,
  error: Vue.prototype.$placeholder.generate({
    width: 800,
    height: 500,
  }, 'error', '#ddd', 'red'),
  loading: false,
  attempt: 1,
  supportWebp: false,
  lazyComponent: true,
});

// Global Components
Vue.component('app-banner', AppBanner);
Vue.component('app-panel', AppPanel);
Vue.component('app-title', AppTitle);
Vue.component('app-title-link', AppTitleLink);
Vue.component('app-section-label', AppSectionLabel);
Vue.component('block-text', BlockText);
Vue.component('tag-group', TagGroup);
Vue.component('tag-single', TagSingle);

export function createApp() {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  // Translation helper functions
  Vue.prototype.$t = val => ((val && typeof val === 'object') ? val[store.state.lang] : '');
  Vue.prototype.$tt = val => ((val && typeof val === 'object') ? val[store.state.langSecondary] : '');
  Vue.prototype.$tl = ((reference) => {
    const translation = _.get(store.state.translations, reference);
    return translation ? translation[store.state.lang] : '';
  });

  // Helper function to append language on links
  Vue.prototype.$link = (link) => {
    if (link && typeof link === 'object' && link.params) {
      link.params.lang = store.state.lang;
      return link;
    }
    return link;
  };

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
