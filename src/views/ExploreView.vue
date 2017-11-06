<template>
  <main class="explore" v-if="initialized">

    <div class="header-push"></div>

    <!-- <div class="explore__overview wrap wrap--wide">

      <div class="heading">

        <app-title-link class="app-title--same fs-l"
        wrap="h1"
        :title="section.title"/>

      </div>

    </div> -->

    <div class="wrap wrap--full">

      <explore-explorer/>

      <div class="explore__loading"
      v-if="loading">

        <div class="heading">

          <h2 v-html="`${$t(translations.fetching)} &hellip;`"></h2>

        </div>

      </div>

      <div class="explore__results"
      v-else-if="activeTags.length">

        <div class="heading">

          <h2><snippet-translate tag="span"
          :snippet="$store.state.translations.explore.results"
          :data="{ count: this.results.length }"
          :parsers="{ count: c => c }"/>.</h2>

          <hr>

        </div>

        <item-grid class="explore__grid" :content="results"/>

      </div>

      <div class="explore__suggestions"
      v-else>

        <explore-groups/>

        <explore-sorts/>

      </div>

    </div>

  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import meta from '../util/meta';
import ExploreExplorer from '../components/ExploreExplorer.vue';
import ExploreGroups from '../components/ExploreGroups.vue';
import ExploreSorts from '../components/ExploreSorts.vue';
import ItemGrid from '../components/ItemGrid.vue';
import SectionHeader from '../components/SectionHeader.vue';
import SnippetTranslate from '../components/SnippetTranslate.vue';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.$store.state.site.sections.explore);
    return {
      title,
      description: this.$t(this.section.description),
      image: this.section.simulacrum,
      type: 'website',
      notice: {
        id: 'explore',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('explore/init', route.query.tag);
  },
  computed: {
    // Explore state
    ...mapState('explore', [
      'initialized',
      'loading',
      'section',
      'results',
    ]),
    // Other state
    ...mapState({
      translations: s => s.translations.explore,
      tags: s => s.tags.entities,
    }),
    ...mapGetters({
      activeTags: 'tags/active',
    }),
  },
  components: {
    ExploreExplorer,
    ExploreGroups,
    ExploreSorts,
    ItemGrid,
    SectionHeader,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.explore {
  padding-top: 1em;
  &__overview {
    text-align: center;
  }
  &__section {
    margin-bottom: 1.5em;
  }
  &__tags {
    margin: -0.125em;
  }
  &__results {
    margin-bottom: 1em;
  }
  &__options {
    span {
      margin-right: 0.25em;
    }
  }
  &__option {
    color: @grey;
    &:not(:last-child) {
      &:after {
        content: ',';
      }
    }
    button {
      background: none;
      padding: 0;
      border: none;
      &:hover {
        color: @accent;
      }
      &.selected {
        color: @accent;
      }
    }
  }
}
</style>
