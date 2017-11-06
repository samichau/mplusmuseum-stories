export default function () {
  return {
    namespaced: true,

    state: {
      notice: false,
    },

    getters: {

    },

    actions: {

    },

    mutations: {
      updateNotice(state, notice) {
        state.notice = notice;
      },
      clearNotice(state) {
        state.notice = false;
      },
    },

  };
}
