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
      url: '',
      authors: [],
      descriptors: [],
      social: [],
      translations: {},
      links: {},
      initialized: false,
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
        console.log(context.state.initialized);
        if (!context.state.initialized) {
          return asyncGet('data/site/').then((response) => {
            context.commit('init', response.data);
            context.commit('tags/set', response.data);
            return response;
          });
        }
        return Promise.resolve(new Response(true));
      },
    },
    mutations: {
      init(state, data) {
        data.authors.forEach((author) => { author.active = false; });
        state.url = data.baseURL;
        state.links = data.links;
        state.authors = data.authors;
        state.social = data.social;
        state.translations = data.translations;
        state.descriptors = data.descriptors;
        state.initialized = true;
      },
      setAuthor(state, authorName) {
        state.authors.forEach((author) => {
          author.active = author.name === authorName;
        });
      },
    },
  };
}
