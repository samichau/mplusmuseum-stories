<template>
  <app-panel>

    <template slot="content">

      <journal-article-featured :content="content"
      showIssue/>

    </template>

  </app-panel>
</template>

<script>
import JournalArticleFeatured from './JournalArticleFeatured.vue';

export default {
  props: {
    content: {
      required: true,
    },
  },
  components: {
    JournalArticleFeatured,
  },
};
</script>
