<template>
  <div class="vimeo-block block">
    <div class="vimeo-block__wrap">
      <iframe :src="`https://player.vimeo.com/video/${$t(content)}`"
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
    content: {
      required: true,
    },
  },
};
</script>

<style lang="less">
.vimeo-block {
  &__wrap {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    width: 100%;
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

