import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      initialized: false,
      loading: false,
      section: {},
      group: false,
      sort: false,
      groupOrder: [],
      sortOrder: [],
      groups: {},
      sorts: {},
      lastQuery: false,
      results: [],
    },

    getters: {
      activeGroup(state) {
        return state.group ? state.groups[state.group] : false;
      },
      activeSort(state) {
        return state.sort ? state.sorts[state.sort] : false;
      },
      groups(state) {
        return state.groupOrder.map(id => state.groups[id]);
      },
      sorts(state) {
        return state.sortOrder.map(id => state.sorts[id]);
      },
    },

    actions: {
      init(context, tags = []) {
        // Cast tags to array first
        tags = tags instanceof Array ? tags : [tags];
        const tagString = tags.join('');

        if (context.state.lastQuery === tagString) {
          return Promise.resolve(new Response(true));
        }

        if (!context.state.initialized) {
          context.commit('setLastQuery', tagString);
          return context.dispatch('query', { init: true, query: { tags } })
            .then(response => () => {
              context.commit('tags/setActive', tags, { root: true });
              return response;
            });
        }

        if (!tags.length) {
          context.commit('setLoading', true);
          context.commit('setLastQuery', tagString);
          context.commit('tags/setActive', tags, { root: true });
          return context.dispatch('reset')
            .then((response) => {
              context.commit('setLoading', false);
              return response;
            });
        }

        context.commit('setLoading', true);
        context.commit('setLastQuery', tagString);
        context.commit('tags/setActive', tags, { root: true });
        return context.dispatch('query', { query: { tags, sectionData: false } })
          .then((response) => {
            context.commit('setLoading', false);
            return response;
          });
      },
      query(context, { init = false, query }) {
        return asyncGet('explore/', query).then((response) => {
          if (init) context.commit('init', response.data);
          context.commit('setResults', response.data.results);
          return response;
        });
      },
      reset(context) {
        context.commit('tags/reset', {}, { root: true });
        return new Response(true);
      },
    },

    mutations: {
      init(state, data) {
        state.section = {
          title: data.title,
          simulacrum: data.title,
          description: data.desc,
        };
        state.group = data.group;
        state.sort = data.sort;
        state.groupOrder = data.groupOrder;
        state.sortOrder = data.sortOrder;
        state.groups = data.entities.groups;
        state.sorts = data.entities.sorts;
        state.initialized = true;
      },
      setResults(state, results) {
        state.results = results;
      },
      setGroup(state, id) {
        state.group = id;
      },
      setSort(state, id) {
        state.sort = id;
      },
      setLastQuery(state, query) {
        state.lastQuery = query;
      },
      setLoading(state, loading) {
        state.loading = loading;
      },
    },
  };
}
