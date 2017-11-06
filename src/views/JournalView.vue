<template>
  <main class="journal" v-if="journal">
    
    <div class="header-push"></div>

    <app-sticky fadeOut>

      <div class="journal__overview wrap wrap--wide">

        <div class="heading">

          <app-title-link class="app-title--same fs-l"
          wrap="h1"
          :title="journal.title"/>

        </div>

        <block-text :content="journal.blurb"/>

      </div>

    </app-sticky>
    

    <div class="over">

      <div class="journal__content wrap wrap--wide">

        <section class="journal__section"
        :class="`journal__section--${section}`"
        v-for="section of journal.sections"
        :key="section">
          <component :is="`journal-section-${section}`"
          v-if="journal[section]"
          :content="journal[section]"/>
        </section>

      </div>

    </div>

  </main>
</template>

<script>
import AppSticky from '../components/AppSticky.vue';
import JournalSectionArticles from '../components/JournalSectionArticles.vue';
import JournalSectionImprint from '../components/JournalSectionImprint.vue';
import JournalSectionIssues from '../components/JournalSectionIssues.vue';
import JournalSectionFeatured from '../components/JournalSectionFeatured.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.$store.state.site.sections.journal);
    return {
      title,
      description: this.$t(this.journal.desc),
      image: this.journal.simulacrum,
      type: 'website',
      notice: {
        id: 'journal',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('journal/init', route.params);
  },
  components: {
    AppSticky,
    JournalSectionArticles,
    JournalSectionImprint,
    JournalSectionIssues,
    JournalSectionFeatured,
  },
  computed: {
    journal() {
      return this.$store.state.journal.page;
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.journal {
  &__overview {
    padding-top: 1em;
    padding-bottom: 1.5em;
    .heading {
      text-align: center;
    }
  }
}
  
</style>
