import _ from 'lodash';
// import locales from '../locale';

export default function () {
  return {
    namespaced: true,

    state: {
      active: [],
      query: '',
      order: [],
      entities: [],
    },

    getters: {
      // Returns a collection (object) of tags
      // Omits all active tags
      active(state) {
        return state.active.map(id => state.entities[id]);
      },
      mappedOrder(state) {
        return state.order.map(id => state.entities[id]);
      },
      // Returns a collection (object) of tags
      // The key is the tag id
      // The value is a lowercased concatenation of the tag names in all languages
      searchable(state, getters) {
        return _.reduce(getters.mappedOrder, (tags, { id, str }) => {
          if (!_.includes(state.active, id)) {
            tags.push({
              id,
              str,
            });
          }
          return tags;
        }, []);
      },
      filtered(state, getters) {
        const limit = 6;
        let { query } = state;
        const { entities, active } = state;
        // If we have a query, return filtered results
        if (query.length) {
          query = query.toLowerCase();
          const tagIds = _.reduce(getters.searchable, (newTags, searchableTag) => {
            if (searchableTag.str.indexOf(query) > -1) {
              newTags.push(searchableTag.id);
            }
            return newTags;
          }, []);
          return tagIds.slice(0, limit).map(tagId => entities[tagId]);
        }
        // If we do not have a query but there are already active tags, suggest more
        if (active.length) {
          return getters.searchable
            .slice(0, limit)
            .map(tag => entities[tag.id]);
        }
        // Else just return empty
        return [];
      },
    },

    mutations: {
      set(state, { tags }) {
        state.entities = tags.entities;
        state.order = tags.order;
      },
      setQuery(state, query) {
        state.query = query;
      },
      setActive(state, tagNames) {
        const tagIds = _.map(tagNames, (name) => {
          const tag = _.find(state.entities, t => t.name === name);
          return tag.id;
        });
        state.active = tagIds;
        state.query = '';
      },
      reset(state) {
        state.active = [];
        state.query = '';
      },
    },

  };
}
