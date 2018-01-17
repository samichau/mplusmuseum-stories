import _ from 'lodash';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      page: false,
      remaining: false,
      exhibitions: [],
    },

    getters: {
    },

    actions: {
      init(context) {
        // If we have already initialized the page, we don't need to fetch data
        if (context.state.page !== false) {
          return Promise.resolve(new Response(true));
        }

        return asyncGet('exhibitions/').then((response) => {
          const { data, data: { exhibitions, remaining } } = response;
          context.commit('setPage', data);
          context.commit('setExhibitions', exhibitions);
          context.commit('setRemaining', remaining);
          return response;
        });
      },

      getExhibitions(context, offset) {
        return asyncGet('exhibitions/', { offset })
          .then((response) => {
            const { data: { exhibitions, remaining } } = response;
            context.commit('appendExhibitions', exhibitions);
            context.commit('setRemaining', remaining);
            return response;
          });
      },

    },

    mutations: {
      setPage(state, data) {
        state.page = _.pick(data, [
          'blurb',
          'desc',
          'generated',
          'id',
          'name',
          'simulacrum',
          'title',
        ]);
      },

      setExhibitions(state, exhibitions) {
        state.exhibitions = exhibitions;
      },

      appendExhibitions(state, exhibitions) {
        state.exhibitions = state.exhibitions.concat(exhibitions);
      },

      setRemaining(state, remaining) {
        state.remaining = remaining;
      },

    },
  };
}
