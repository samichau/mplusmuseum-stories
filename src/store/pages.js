import _find from 'lodash/find';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      name: false,
      template: false,
      loaded: [],
    },

    getters: {
      activePage(state) {
        return _find(state.loaded, page => page.name === state.name);
      },
    },

    actions: {
      update(context, to) {
        const loadedPage = _find(context.state.loaded, page => page.name === to);

        if (loadedPage) {
          context.commit('activatePage', loadedPage);
          return new Response(true);
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
}
