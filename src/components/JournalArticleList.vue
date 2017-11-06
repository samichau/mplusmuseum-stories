<template>
  <div class="article-list">
    <template v-for="(article, i) of content">
      <journal-article-listing
      :class="{ 'article-listing--featured' : article.featured && showFeatured !== false }"
      :key="article.id"
      :content="article"
      :showIssue="showIssue"/>
      <hr>
    </template>
  </div>
</template>

<script>
import JournalArticleListing from './JournalArticleListing.vue';

export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
    showFeatured: {
      default: false,
    },
    showIssue: {
      default: false,
    },
  },
  components: {
    JournalArticleListing,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.article-list {
  hr {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    &:last-child {
      display: none;
    }
  }
}

</style>
