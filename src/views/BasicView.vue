<template>
  <div class="page--basic">
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

export default {
  props: {
    page: {
      required: true,
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
  .page--basic {
    .page {
      &__content {
        margin: 5rem auto;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        max-width: 1040px;
        .text-block {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
</style>
