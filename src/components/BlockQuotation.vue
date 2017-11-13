<template>
  <div class="quotation-block block">
    <div class="quotation-block__quote fs-m" v-html="$t(content.quote)"></div>
    <div class="quotation-block__attribution fs-m" v-if="content.attribution">
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
.quotation-block {
  margin-bottom: 1.5em;
  &:last-child {
    margin-bottom: 0;
  }
  &__quote,
  &__attribution {
    line-height: 1.35;
  }
  &__quote {
    font-style: italic;
  }
}
</style>

