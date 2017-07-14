<template>
  <span class="dynamic-title">
    <span class="lang-primary" v-html="$t(title)"></span>&ensp;<router-link :to="{ params: { lang: $store.state.langSecondary } }" class="lang-secondary" v-html="$tt(title)"></router-link>
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      required: true,
    },
  },
};
</script>

