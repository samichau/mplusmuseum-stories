<template>
  <div class="youku-block block">
    <div class="youku-block__wrap">
      <iframe type="text/html"
      :src="`http://player.youku.com/embed/${$t(content)}`"
      allowfullscreen
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
};
</script>

<style lang="less">
.youku-block {
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
