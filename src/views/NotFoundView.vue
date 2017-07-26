<template>
<div class="not-found">
  <div class="header-push"></div>
  <div class="not-found__inner">
    <div>
      <h1 class="fs-l">404: <dynamic-title class="dynamic-title--same" :title="header"></dynamic-title></h1>
      <p class="fs-m" v-html="$t(message)"></p>
    </div>
  </div>
</div>
</template>

<script>
import meta from '../util/meta';
import { fetch } from '../util/fetch';
import DynamicTitle from '../components/DynamicTitle.vue';

export default {
  mixins: [meta],
  meta() {
    return {
      title: '404',
      description: 'The requested resource could not be found.',
    };
  },
  asyncData({ store }) {
    return fetch(store, false, false);
  },
  computed: {
    header() {
      return this.$store.state.site.translations.site.notFound;
    },
    message() {
      return this.$store.state.site.translations.site.notFoundMessage;
    },
  },
  components: {
    DynamicTitle,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.not-found {
  background: @accent;
  color: @white;
  &__inner {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
