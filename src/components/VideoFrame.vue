<template>
  <div class="video-block block">
    <div class="video-block__wrap">
      <iframe :src="url"
      type="text/html"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen></iframe>
    </div>
    <div v-if="caption"
    class="video-block__caption fs-s"
    v-html="caption"></div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
    },
    caption: {
      default: false,
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.video-block {
  &__wrap {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }
  &__caption {
    margin: 1rem 0;
    color: @midgrey;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

