<template>
  <div class="not-found">

    <div class="header-push"></div>

    <div class="not-found__inner">

      <div class="wrap wrap--x-wide">

        <h1 class="fs-l">404: <app-title-link class="app-title--same" :title="header"/></h1>

        <p class="fs-m" v-html="message"></p>

      </div>

    </div>

  </div>
</template>

<script>
import { Response } from '../api';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    return {
      title: '404',
      description: 'The requested resource could not be found.',
      notice: false,
    };
  },
  asyncData() {
    return Promise.resolve(new Response(true));
  },
  computed: {
    header() {
      return this.$store.state.translations.site.notFound;
    },
    message() {
      return this.$tl('site.notFoundMessage');
    },
  },
  components: {
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
