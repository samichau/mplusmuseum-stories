export default {
  namespaced: true,
  state: {
    menu: [],
    marquee: [
      {
        content: {
          en: 'M+ Stories is the new M+ online curatorial platform',
          tc: 'M +故事是新的M +在線策展平台',
        },
      },
    ],
  },
  mutations: {
    init(state, items) {
      state.menu = items;
    },
  },
};
