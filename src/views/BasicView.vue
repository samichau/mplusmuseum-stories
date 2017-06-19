<template>
  <div class="page">
    <banner :data="page.banner"></banner>
    <div class="page__content" v-if="page.sections">
      <component v-for="(section, i) of page.sections.list" :key="i" :is="section.type" :content="section.content"></component>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import ImageBlock from '../components/ImageBlock.vue';
import TextBlock from '../components/TextBlock.vue';
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
    return fetch(store, 'pages/update', { type: 'basic', to: route.name });
  },
  computed: {
    page() {
      return this.$store.getters['pages/activeBasic'];
    },
  },
  components: {
    Banner,
    ImageBlock,
    TextBlock,
  },
};
</script>

<style lang="less">
  .page {
    &__content {
      margin: 5rem auto;
      padding-left: 2rem;
      padding-right: 2rem;
      max-width: 1040px;
      .text-block {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
</style>
