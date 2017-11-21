export default function () {
  return {
    namespaced: true,

    state: {
      active: false,
      image: false,
      share: {},
      qr: false,
    },

    mutations: {
      open(state, { image, share }) {
        state.active = true;
        state.image = image;
        state.share = share;
      },
      close(state) {
        state.active = false;
      },
      updateQR(state, payload) {
        state.qr = payload;
      },
    },
  };
}
