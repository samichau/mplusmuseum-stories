<template>
  <main class="page--basic" :class="{'page--fix-banner': page.hero && page.hero.fixed }">
    <app-banner v-if="page.hero" :content="{ hero: page.hero }">
      <div class="header-push"></div>
      <app-title-link class="fs-l app-title--same"
      :title="page.hero.text"
      :wrap="'h1'"
      :block="true"/>
    </app-banner>
    <div v-else class="header-push"></div>
    <div class="page__wrap">
      <content-blocks class="page__content"
      v-if="page.content"
      :items="page.content.list"/>
    </div>
  </main>
</template>

<script>
import ContentBlocks from '../components/ContentBlocks.vue';

export default {
  props: {
    page: {
      required: true,
    },
  },
  components: {
    ContentBlocks,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.page {
  &__wrap {
    background: @lightgrey;
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
      .block {
        padding-left: 1em;
        padding-right: 1em;
        max-width: @widthSmall;
        margin-left: auto;
        margin-right: auto;
      }
      .image-block, .video-block {
        max-width: 960px;
      }
      .instagram-block {
        max-width: 600px;
      }
    }
  }
}

@bannerSize: 100vh;

.page--fix-banner {
  position: relative;
  padding-top: 50vh;
  .mq-sm({
    padding-top: 60vh;
  });
  .mq-md({
    padding-top: 70vh;
  });
}

.page--fix-banner {
  .banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .page__wrap {
    position: relative;
    z-index: 5;
  }
}

</style>
