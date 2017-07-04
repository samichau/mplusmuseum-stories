<template>
  <div class="page--basic" :class="{'page--fix-banner': page.banner && page.banner.fixed }">
    <banner v-if="page.banner" :data="page.banner"></banner>
    <div v-else class="header-push"></div>
    <div class="page__wrap">
      <content-blocks class="page__content"
      v-if="page.sections"
      :items="page.sections.list"></content-blocks>
    </div>
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
@import "../less/variables.less";

.page {
  &__wrap {
    background: @white;
    &:before, &:after{
      content: ' ';
      display: table;
    }
  }
}
.page--basic {
  .page {
    &__content {
      margin: 2em auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      // padding: 0 1.5rem;
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
.page--fix-banner {
  padding-top: 100%;
  position: relative;
  .mq-sm({
    padding-top: 80%;
  });
  .mq-md({
    padding-top: 60%;
  });
  .mq-lg({
    padding-top: 40%;
  });
  .banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
