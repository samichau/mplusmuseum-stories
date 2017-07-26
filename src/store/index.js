import Vue from 'vue';
import Vuex from 'vuex';
import site from './site';
import pages from './pages';
import blog from './blog';
import lightbox from './lightbox';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      lang: false,
      langSecondary: false,
    },

    mutations: {
      setLanguage(state, { primary, secondary }) {
        state.lang = primary;
        state.langSecondary = secondary;
      },
    },

    modules: {
      site: site(),
      pages: pages(),
      blog: blog(),
      lightbox: lightbox(),
    },
  });
}
