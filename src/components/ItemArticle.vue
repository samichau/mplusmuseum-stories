<template>
  <div class="item item--article">

    <app-panel class="panel--mini shadow--small">

      <div slot="content" class="panel__inner">

        <router-link :to="link">

          <app-section-label type="article"/>

          <app-title class="item__title"
          wrap="div"
          :title="item.title"/>

        </router-link>

        <div class="item__text fs-b">
          <span v-html="`${$t(item.excerpt)}`"/>&thinsp;
          <router-link :to="link">[...]</router-link>
        </div>

        <tag-group class="fs-s" :tagIds="item.tags"/>

      </div>

    </app-panel>

  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    link() {
      return {
        name: 'article',
        params: {
          lang: this.$store.state.lang,
          issue: this.item.issue.name,
          article: this.item.name,
        },
      };
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.item--article {
  .item {
    &__title {
      margin-bottom: 0.25em;
    }
    &__text {
      a {
        font-weight: @fontBold;
        color: @accent;
      }
    }
  }
}
</style>
