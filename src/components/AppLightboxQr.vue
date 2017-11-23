<template>
  <div class="lightbox-qr" @click="close">

    <div class="lightbox-qr__inner shadow">

      <app-qr-code :code="$store.state.lightbox.qr"
      fill="#1946ff"/>

    </div>

  </div>
</template>

<script>
import { lightboxMixin } from '../util/mixins';

const AppQrCode = () => import('./AppQrCode.vue');

export default {
  mixins: [lightboxMixin],
  components: {
    AppQrCode,
  },
  methods: {
    close() {
      this.$store.commit('lightbox/updateQR', false);
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.lightbox-qr {
  position: fixed;
  z-index: 1005;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  &__inner {
    background: @white;
    padding: 1em;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 300px;
  }
}
</style>

