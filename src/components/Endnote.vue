<template>
  <div class="endnote-block block">
    <div class="endnote-block__content fs-s" v-html="$t(content.html)"></div>
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
@import "../less/variables.less";

.endnote-block {
  margin-top: 2em;
  border: 1px solid @accent;
  &__content {
    padding: 1em;
  }
}
</style>
