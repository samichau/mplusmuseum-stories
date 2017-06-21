import { asyncGet, Response } from '../api';

export default {
  namespaced: true,

  state: {
    name: false,
    template: false,
    loaded: [],
  },

  getters: {
    activePage(state) {
      return state.loaded.find(page => page.name === state.name);
    },
  },

  actions: {
    update(context, to) {
      const loadedPage = context.state.loaded.find(page => page.name === to);

      if (loadedPage) {
        context.commit('activatePage', loadedPage);
        return Promise.resolve(new Response(true));
      }

      return asyncGet(`pages/${to}/`)
        .then((response) => {
          context.commit('newPage', response.data);
          return response;
        });
    },
  },

  mutations: {
    newPage(state, page) {
      state.loaded.push(page);
      state.name = page.name;
      state.template = page.template;
    },
    activatePage(state, page) {
      state.name = page.name;
      state.template = page.template;
    },
  },
};
