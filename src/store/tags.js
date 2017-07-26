function addTagProperties(tag) {
  tag.active = false;
  return tag;
}

export default function () {
  return {
    namespaced: true,
    state: {
      items: [],
    },

    getters: {
      active(state) {
        return state.items.filter(t => t.active);
      },
    },

    mutations: {
      set(state, { tags }) {
        state.items = tags.map(tag => addTagProperties(tag));
      },
      setActive(state, tags) {
        state.items.forEach((tag) => {
          tag.active = tags.some(t => t === tag.name);
        });
      },
    },

  };
}
