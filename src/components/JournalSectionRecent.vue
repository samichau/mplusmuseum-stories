<template>
  <app-panel>

    <div class="panel__inner" slot="content">

      <div class="heading">
        <app-title-link class="fs-m"
        wrap="h2"
        :title="$store.state.translations.journal.recent"/>
      </div>

      <journal-article-list :content="content"
      showFeatured
      showIssue/>

    </div>

  </app-panel>
</template>

<script>
import JournalArticleList from '../components/JournalArticleList.vue';

export default {
  props: {
    content: {
      required: true,
    },
  },
  components: {
    JournalArticleList,
  },
};
</script>
