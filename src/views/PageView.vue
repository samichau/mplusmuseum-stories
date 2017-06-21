<template>
  <component class="page" :is="template" :page="page"></component>
</template>

<script>
import Basic from './BasicView.vue';
import Documentation from './DocumentView.vue';
import metaMixin from '../util/meta';
import { fetch } from '../util/fetch';

export default {
  mixins: [metaMixin],
  meta() {
    return {
      title: this.$t(this.page.title),
      description: this.$t(this.page.desc),
    };
  },
  asyncData({ store, route }) {
    return fetch(store, 'pages/update', route.params.page);
  },
  computed: {
    template() {
      return this.$store.state.pages.template;
    },
    page() {
      return this.$store.getters['pages/activePage'];
    },
  },
  components: {
    Basic,
    Documentation,
  },
};
</script>
