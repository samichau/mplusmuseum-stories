import { asyncGet, Response } from '../api';

export default {
  namespaced: true,

  state: {
    basic: false,
    document: false,
    loaded: [],
  },

  getters: {
    activeBasic(state) {
      return state.loaded.find(page => page.name === state.basic);
    },
    activeDocument(state) {
      return state.loaded.find(page => page.name === state.document);
    },
  },

  actions: {
    update(context, { type, to }) {
      const loaded = context.state.loaded.find(page => page.name === to);

      if (loaded) {
        context.commit('activatePage', { type, to });
        return Promise.resolve(new Response(true));
      }

      return asyncGet(`${to}/`)
        .then((response) => {
          context.commit('newPage', { page: response.data, type });
          return response;
        });
    },
  },

  mutations: {
    newPage(state, { page, type }) {
      state.loaded.push(page);
      state[type] = page.name;
    },
    activatePage(state, { type, to }) {
      state[type] = to;
    },
  },
};
