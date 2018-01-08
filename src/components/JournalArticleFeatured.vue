<template>
  <app-banner class="article-featured" :content="content">

    <div class="pinned">

      <img src="../assets/img/pin.svg" alt="Pinned">&nbsp;<span v-html="$t($store.state.translations.journal.pinned)"></span>

    </div>

    <div class="section-label fs-s">
      <template v-if="showIssue !== false"><snippet-issue-number :number="content.issue.number"/>:&ensp;</template><span v-html="$t(content.theme.title)"></span>
    </div>

    <app-title class="fs-l"
    wrap="h3"
    :title="content.title"/>

    <!-- <div class="banner__meta fs-b" v-html="byline"></div> -->

  </app-banner>
</template>

<script>
import SnippetIssueNumber from './SnippetIssueNumber.vue';

export default {
  props: {
    content: {
      required: true,
    },
    showIssue: {
      default: false,
    },
  },
  computed: {
    byline() {
      // @TODO Make translation authorable ?
      const by = {
        en: 'By ',
        tc: '由',
      };
      const author = this.$t(this.$store.state.site.authors[this.content.author].title);
      return `${this.$t(by)}${author}`;
    },
  },
  components: {
    SnippetIssueNumber,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.article-featured {
  .wrap {
    .mq-sm({
      max-width: 85%;
    })
  }
}
</style>
