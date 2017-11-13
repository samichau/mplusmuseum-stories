<template>
  <div class="quote-block block">
    <div class="quote-block__quote fs-m" v-html="$t(content.quote)"></div>
    <div class="quote-block__attribution fs-m" v-if="content.attribution">
      —<span v-html="$t(content.attribution)"></span>
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
.quote-block {
  margin-bottom: 1.5em;
  &__quote,
  &__attribution {
    line-height: 1.35;
  }
  &__quote {
    font-style: italic;
  }
}
</style>

