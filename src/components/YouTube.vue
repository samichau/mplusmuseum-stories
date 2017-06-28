<template>
  <div class="youtube-block block">
    <div class="youtube-block__wrap">
      <iframe type="text/html"
      :src="`https://www.youtube.com/embed/${$t(content)}?autoplay=0&color=white&hl=${lang}`"
      frameborder="0"></iframe>
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
  computed: {
    lang() {
      return this.$store.state.lang === 'tc' ? 'zh-hk' : 'en';
    },
  },
};
</script>

<style lang="less">
.youtube-block {
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

