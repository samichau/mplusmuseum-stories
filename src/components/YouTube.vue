<template>
  <div class="youtube-embed block">
    <iframe type="text/html"
    :src="`https://www.youtube.com/embed/${$t(content)}?autoplay=0`"
    frameborder="0"></iframe>
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
.youtube-embed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

