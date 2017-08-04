<template>
  <component :is="wrap" class="dynamic-title" :class="{ 'dynamic-title--block': block  }">
    <span class="lang-primary" v-html="$t(title)"></span><template v-if="!block">&ensp;</template><router-link :to="{ params: { lang: $store.state.langSecondary } }" class="lang-secondary" v-html="$tt(title)"></router-link>
  </component>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      required: true,
    },
    wrap: {
      default: 'span',
    },
    block: {
      default: false,
    },
  },
};
</script>

<style lang="less">
.dynamic-title {
  &--same {
    .lang-secondary {
      color: inherit;
    }
  }
  &--block {
    span, a {
      display: block;
    }
  }
}
</style>
