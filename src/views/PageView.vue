<template>
  <component class="page" :is="template" :page="page"></component>
</template>

<script>
import Basic from './BasicView.vue';
import Documentation from './DocumentView.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    const image = this.page.simulacrum
      || (this.page.banner && this.page.banner.length)
      ? this.page.banner.images[0].src
      : false;
    return {
      title: this.$t(this.page.title),
      description: this.$t(this.page.desc),
      image,
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('pages/update', route.params.page);
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
