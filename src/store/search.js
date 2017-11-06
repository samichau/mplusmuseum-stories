import _orderBy from 'lodash/orderBy';
import { asyncGet, Response } from '../api';

const sorts = [
  {
    title: 'Sort by Type',
    value: {
      by: 'type',
      order: 'asc',
    },
  },
  {
    title: 'Sort by Oldest',
    value: {
      by: 'modified',
      order: 'asc',
    },
  },
];

const filters = [
  'article',
  'post',
  'episode',
  'exhibition',
  'documentation',
  'issue',
  'basic',
];

export default function () {
  return {
    namespaced: true,

    state: {
      searching: false,
      input: '',
      query: '',
      sort: false,
      sorts,
      filter: '',
      filters,
      results: [],
    },

    getters: {
      sortedResults({ sort, results }) {
        if (!sort) {
          return _orderBy(results, ['modified'], ['desc']);
        }
        return _orderBy(results, [sort.value.by], [sort.value.order]);
      },
    },

    actions: {
      init(context, query) {
        if (query && query.length) {
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
