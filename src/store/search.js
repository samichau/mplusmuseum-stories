import _ from 'lodash';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      searching: false,
      input: '',
      query: '',
      lastQuery: '',
      sort: false,
      filter: '',
      results: [],
    },

    getters: {
      sortedResults({ sort, results }) {
        if (!sort) {
          return _.orderBy(results, ['modified'], ['desc']);
        }
        return _.orderBy(results, [sort.value.by], [sort.value.order]);
      },
    },

    actions: {
      init(context, query) {
        if (query && query.length) {
          if (query !== context.state.lastQuery) context.commit('setFilter', false);
          context.commit('setQuery', query);
          return context.dispatch('submit');
        }
        return Promise.resolve(new Response(true));
      },
      filter(context, param) {
        context.commit('setFilter', param);
        context.dispatch('submit');
      },
      submit(context) {
        const { lang } = context.rootState;
        const { query, filter } = context.state;
        const params = { q: query, lang };
        if (filter) params.filter = filter.value;
        context.commit('setStatus', true);
        return asyncGet('data/search/', params)
          .then((response) => {
            context.commit('setResults', response.data);
            context.commit('setStatus', false);
            context.commit('setLastQuery', query);
            return response;
          })
          .catch((error) => {
            context.commit('setStatus', false);
            // Throw error because we need to catch it in the view
            throw error;
          });
      },
    },

    mutations: {
      setSort(state, sort) {
        state.sort = sort;
      },
      setFilter(state, filter) {
        state.filter = filter;
      },
      setQuery(state, query) {
        state.query = query;
      },
      setLastQuery(state, query) {
        state.lastQuery = query;
      },
      setInput(state, input) {
        state.input = input;
      },
      setStatus(state, status) {
        state.searching = status;
      },
      setResults(state, { results }) {
        state.results = results;
      },
    },
  };
}
