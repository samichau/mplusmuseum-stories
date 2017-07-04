<template>
  <div class="brightcove-video block">
    <div class="brightcove-video__wrap" v-if="validated">
      <video class="video-js brightcove-video__media"
      v-if="loaded"
      ref="media"
      :data-video-id="$t(content.id)"
      :data-account="content.account"
      :data-player="content.player"
      data-embed="default"
      data-application-id
      controls></video>
    </div>
  </div>
</template>


<script>
import addScript from '../util/promise-script';

export default {
  data() {
    return {
      loaded: false,
      validated: false,
      player: null,
    };
  },
  props: {
    content: {
      required: true,
      type: Object,
    },
  },
  created() {
    const content = this.content;
    this.validated = Object.prototype.hasOwnProperty.call(content, 'id')
      && Object.prototype.hasOwnProperty.call(content, 'account')
      && Object.prototype.hasOwnProperty.call(content, 'player');
  },
  mounted() {
    const scriptLoaded = !window.videojs || !window.bc
      ? addScript(`//players.brightcove.net/${this.content.account}/${this.content.player}_default/index.min.js`)
      : Promise.resolve();

    scriptLoaded.then(() => {
      this.loaded = true;
      this.$nextTick(() => {
        if (this.validated) {
          window.bc(this.$refs.media);
          this.player = window.videojs(this.$refs.media);
        }
      });
    });
  },
  destroyed() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="less">
.brightcove-video {
  &__wrap {
    position: relative;
    padding-bottom: 56.25%;
  }
  &__media {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
