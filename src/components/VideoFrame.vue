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
  </div>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
    },
  },
};
</script>

<style lang="less">
.video-block {
  &__wrap {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
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

