<template>
  <div class="quotation-block block">

    <div class="quotation-block__quote fs-m" v-html="$t(content.quote)"></div>

    <div class="quotation-block__attribution" v-if="content.attribution">

      &mdash; <span v-html="$t(content.attribution)"></span>

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
@import '../less/variables.less';

.quotation-block {
  margin-top: 2em;
  margin-bottom: 2em;
  &__quote,
  &__attribution {
    line-height: 1.35;
  }
  &__quote {
    font-weight: @fontBold;
  }
  &__attribution {
    margin-top: 0.25em;
  }
}
</style>

