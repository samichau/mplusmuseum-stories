<template>
  <div class="text-block" v-html="$t(content.html)"></div>
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
@import '../less/variables.less';

.text-block {
  margin-bottom: 1em;
  h1,h2,h3,h4,h5,h6 {
    margin-bottom: 1em;
    color: @accent;
  }
  ul {
    margin-top: 0;
    margin-bottom: 1em;
    padding: 0 0 0 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
  iframe {
    width: 100%;
    margin: 2em 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
