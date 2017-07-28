<template>
  <div class="brightcove-video block">
    <div class="brightcove-video__wrap" v-if="validated">
      <video class="video-js brightcove-video__media"
      v-if="loaded"
      ref="media"
      :data-video-id="$t(content.media.id)"
      :data-account="content.media.account"
      :data-player="content.media.player"
      data-embed="default"
      data-application-id
      controls></video>
    </div>
    <div v-if="content.caption"
    class="image-block__caption fs-s"
    v-html="$t(content.caption)"></div>
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
    this.validated = Object.prototype.hasOwnProperty.call(this.content.media, 'id')
      && Object.prototype.hasOwnProperty.call(this.content.media, 'account')
      && Object.prototype.hasOwnProperty.call(this.content.media, 'player');
  },
  mounted() {
    if (this.validated) {
      const scriptLoaded = !window.videojs || !window.bc
        ? addScript(`//players.brightcove.net/${this.content.media.account}/${this.content.media.player}_default/index.min.js`)
        : Promise.resolve();

      scriptLoaded.then(() => {
        this.loaded = true;
        this.$nextTick(() => {
          window.bc(this.$refs.media);
          this.player = window.videojs(this.$refs.media);
        });
      });
    }
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
