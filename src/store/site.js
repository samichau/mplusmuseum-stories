import _find from 'lodash/find';
import tags from './tags';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,
    modules: {
      tags: tags(),
    },
    state: {
      authors: [],
      desc: {},
      descriptors: [],
      initialized: false,
      links: {},
      simulacrum: '',
      social: [],
      title: {},
      translations: {},
      url: '',
    },
    getters: {
      activeAuthor(state) {
        return _find(state.authors, a => a.active) || false;
      },
      socialShareables(state) {
        return state.social.filter(platform => platform.share);
      },
      socialLinkables(state) {
        return state.social.filter(platform => platform.link);
      },
    },
    actions: {
      init(context) {
        if (!context.state.initialized) {
          return asyncGet('data/site/').then((response) => {
            context.commit('init', response.data);
            context.commit('tags/set', response.data);
            return response;
          });
        }
        return Promise.resolve(new Response(true));
      },
      triggerNativeEvent(context, event) {
        const evt = window.document.createEvent('UIEvents');
        evt.initUIEvent(event, true, false, window, 0);
        window.dispatchEvent(evt);
      },
    },
    mutations: {
      init(state, data) {
        // @TODO Check this is reactive
        data.authors.forEach((author) => { author.active = false; });
        state.authors = data.authors;
        state.desc = data.desc;
        state.descriptors = data.descriptors;
        state.initialized = true;
        state.links = data.links;
        state.simulacrum = data.simulacrum;
        state.social = data.social;
        state.title = data.title;
        state.translations = data.translations;
        state.url = data.baseURL;
      },
      setAuthor(state, authorName) {
        state.authors.forEach((author) => {
          author.active = author.name === authorName;
        });
      },
    },
  };
}
