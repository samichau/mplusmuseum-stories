<template>
  <div class="page--basic">
    <banner v-if="page.banner" :data="page.banner"></banner>
    <div v-else class="header-push"></div>
    <content-blocks class="page__content"
    v-if="page.sections"
    :items="page.sections.list"></content-blocks>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import ContentBlocks from '../components/ContentBlocks.vue';

export default {
  props: {
    page: {
      required: true,
    },
  },
  components: {
    Banner,
    ContentBlocks,
  },
};
</script>

<style lang="less">
  .page--basic {
    .page {
      &__content {
        margin: 5rem auto;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        max-width: 1040px;
        .block {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          &.image-block, &.youtube-block {
            max-width: 100%;
          }
          &.instagram-block {
            max-width: 600px;
          }
        }
      }
    }
  }
</style>
