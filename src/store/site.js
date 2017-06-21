import _find from 'lodash/find';
import promiseAllSoftFail from '../util/promise-all-soft-fail';
import tags from './tags';
import { asyncGet, Response } from '../api';

export default {
  namespaced: true,
  modules: {
    tags,
  },
  state: {
    url: '',
    authors: [],
    social: [],
    translations: {},
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
    init(context, { action, payload }) {
      return new Promise((resolve, reject) => {
        const sitePromise = !context.state.initialized
          ? asyncGet('site-settings/')
          : Promise.resolve(new Response(true));

        const viewPromise = action
          ? context.dispatch(action, payload, { root: true })
          : Promise.resolve(new Response(true));

        // We want to avoid fast fail here. If the view specific request
        // fails, but the site request succeeds, we can instantiate the app
        // and redirect to the 404 view
        promiseAllSoftFail([sitePromise, viewPromise]).then((responses) => {
          const siteResponse = responses[0];
          const viewResponse = responses[1];
          if (siteResponse.resolved) {
            if (siteResponse.data) {
              context.commit('init', siteResponse.data);
              context.commit('tags/set', siteResponse.data);
            }
            if (viewResponse.resolved) resolve(responses);
            else resolve(responses);
          } else {
            reject(siteResponse);
          }
        });
      });
    },
  },
  mutations: {
    init(state, data) {
      data.authors.forEach((author) => { author.active = false; });
      state.url = data.baseURL;
      state.authors = data.authors;
      state.social = data.social;
      state.translations = data.translations;
      state.initialized = true;
    },
    setAuthor(state, authorName) {
      state.authors.forEach((author) => {
        author.active = author.name === authorName;
      });
    },
  },
};
