<template>
  <app-panel class="issue-contents">

    <div class="panel__inner" slot="content">

      <section class="issue-contents__section">

        <div class="heading">

          <h2 class="fs-m">

            <span v-html="$t($store.state.site.sections.journal)"></span>&nbsp;<snippet-issue-number :number="issue.number"/>

          </h2>

          <app-title-link class="fs-l"
          wrap="h1"
          :title="issue.title"/>

        </div>

        <block-text v-if="issue.intro" :content="issue.intro"/>


      </section>

      <hr>

      <section class="issue-contents__section">

        <journal-article-list :content="issue.articles"/>

      </section>

      <template v-if="issue.imprint">

        <hr>

        <section class="issue-contents__section">

          <div class="heading">

            <app-title-link class="fs-m"
            wrap="h2"
            :title="$store.state.translations.journal.imprint"/>

          </div>

          <block-text :content="issue.imprint"/>

        </section>

      </template>

    </div>

  </app-panel>
</template>

<script>
import JournalArticleList from './JournalArticleList.vue';
import SectionHeader from './SectionHeader.vue';
import SnippetIssueNumber from './SnippetIssueNumber.vue';

export default {
  props: {
    issue: {
      required: true,
    },
  },
  computed: {
    articles() {
      return this.issue.articles.map(id => this.$store.state.journal.articles[id]);
    },
    themes() {
      return this.$store.state.journal.themes;
    },
  },
  components: {
    JournalArticleList,
    SectionHeader,
    SnippetIssueNumber,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.issue-contents {
  .panel__inner > hr {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
}
  
</style>
