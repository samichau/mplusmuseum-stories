import _ from 'lodash';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      page: false,
    },

    getters: {
    },

    actions: {
      init(context) {
        if (context.state.page !== false) {
          return Promise.resolve(new Response(true));
        }

        return asyncGet('home/').then((response) => {
          context.commit('init', response.data);
          return response;
        });
      },
    },

    mutations: {
      init(state, payload) {
        state.page = payload;
      },
      expandList(state, id) {
        const item = _.find(state.page.content, i => i.id === id);
        item.limit = false;
      },
    },

  };
}
