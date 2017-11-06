import Vue from 'vue';
import Vuex from 'vuex';
import blog from './blog';
import channels from './channels';
import exhibitions from './exhibitions';
import explore from './explore';
import header from './header';
import home from './home';
import journal from './journal';
import lightbox from './lightbox';
import pages from './pages';
import search from './search';
import site from './site';
import tags from './tags';
import { asyncGet, Response } from '../api';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      lang: false,
      langSecondary: false,
      translations: {},
    },
    actions: {
      init(context) {
        if (!context.state.initialized) {
          return asyncGet('data/site/').then((response) => {
            const { data } = response;
            context.commit('site/init', data);
            context.commit('tags/set', data);
            context.commit('setTranslations', data);
            return response;
          });
        }
        return Promise.resolve(new Response(true));
      },
    },
    mutations: {
      setLanguage(state, { primary, secondary }) {
        state.lang = primary;
        state.langSecondary = secondary;
      },
      setTranslations(state, { translations }) {
        state.translations = translations;
      },
    },

    modules: {
      blog: blog(),
      channels: channels(),
      exhibitions: exhibitions(),
      explore: explore(),
      header: header(),
      home: home(),
      journal: journal(),
      lightbox: lightbox(),
      pages: pages(),
      search: search(),
      site: site(),
      tags: tags(),
    },
  });
}
