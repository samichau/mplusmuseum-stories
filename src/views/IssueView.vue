<template>
  <main class="issue" v-if="issue">

    <app-sticky fadeOut v-if="issue.hero">
    
      <app-banner :content="{ hero: issue.hero }"/>

    </app-sticky>

    <div v-else class="header-push"></div>

    <div class="over">

      <div class="issue__content">

        <div class="wrap wrap--wide">

          <journal-issue-contents slot="content" :issue="issue"/>

          <router-link :to="{ name: 'journal' }"
          class="button button--wide button--outline issue__button">
            <snippet-translate
            snippet="journal.return"
            :data="{ title: $store.state.site.sections.journal }"
            :parsers="{ title: (t) => $t(t) }"/>
          </router-link>

        </div>

      </div>

    </div>

  </main>
</template>

<script>
import meta from '../util/meta';
import AppSticky from '../components/AppSticky.vue';
import JournalIssueContents from '../components/JournalIssueContents.vue';
import JournalIssueListing from '../components/JournalIssueListing.vue';
import SnippetTranslate from '../components/SnippetTranslate.vue';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.$store.state.site.sections.journal);
    return {
      title,
      description: this.$t(this.issue.desc),
      image: this.issue.simulacrum,
      type: 'website',
      notice: {
        id: 'journal',
        value: title,
        isTitle: true,
        link: {
          name: 'journal',
        },
      },
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('journal/initIssue', route.params);
  },
  computed: {
    issue() {
      return this.$store.getters['journal/issue'];
    },
    issues() {
      return [];
    },
  },
  components: {
    AppSticky,
    JournalIssueContents,
    JournalIssueListing,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
.issue {
  &__content {
    margin-top: -5vh;
  }
  &__button {
    display: block;
    margin: 3em 0;
  }
}
</style>
