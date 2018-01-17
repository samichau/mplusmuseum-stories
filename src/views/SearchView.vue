<template>
  <main class="search">

    <div class="header-push"></div>

    <div class="wrap wrap--wide">

      <form class="search__query input-wrap input-wrap--inline"
      enctype="multipart/form-data"
      @submit.prevent="submit">

        <label class="fs-l"
        v-show="!query.length"
        for="query"
        v-html="$tl('search.cta')"></label>

        <input class="fs-l"
        v-model="query"
        name="query"
        ref="input"
        type="text"
        autocomplete="off">

      </form>

      <div class="search__content">

        <div class="heading" v-if="submittedQuery.length">

          <p v-if="!searching">
            
            <snippet-translate class="search__status"
            tag="span"
            snippet="search.results"
            :data="{ count: results.length, query: submittedQuery }"
            :parsers="{ count: (c) => c, query: (q, h) => h('strong', {}, q) }"/>

            <a href="#" @click.prevent="filter = !filter">

              <strong v-html="$tl('search.filter')"></strong>
            
            </a>

          </p>

          <p v-else v-html="$tl('search.searching')"></p>

          <search-filter v-if="filter"/>

        </div>

        <div class="search__results" v-if="!searching && submittedQuery.length">

          <search-result class="search__result"
          v-for="result in results" :key="result.id"
          :result="result"
          :query="submittedQuery"/>

        </div>

      </div>

    </div>

  </main>
</template>

<script>
import meta from '../util/meta';
import SearchFilter from '../components/SearchFilter.vue';
import SearchResult from '../components/SearchResult.vue';
import SnippetTranslate from '../components/SnippetTranslate.vue';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.$store.state.site.sections.search);
    return {
      title,
      type: 'website',
      notice: {
        id: 'search',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store, route }) {
    const query = route.query.q;
    return store.dispatch('search/init', query);
  },
  mounted() {
    this.$refs.input.focus();
  },
  data() {
    return {
      filter: false,
      submitted: false,
    };
  },
  methods: {
    submit() {
      const route = { name: 'search' };
      if (this.query.length) route.query = { q: this.query };
      this.$router.push(route);
    },
  },
  computed: {
    searching() {
      return this.$store.state.search.searching;
    },
    results() {
      const results = this.$store.getters['search/sortedResults'];
      return results;
    },
    submittedQuery() {
      return this.$store.state.search.lastQuery;
    },
    query: {
      get() {
        return this.$store.state.search.query;
      },
      set(value) {
        this.$store.commit('search/setQuery', value);
      },
    },
  },
  components: {
    SearchFilter,
    SearchResult,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.search {
  padding-top: 1em;
  padding-bottom: 1em;
  &__query {
    margin-bottom: 1em;
    border-bottom: 2px solid @accent;
  }
  &__tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .tag {
      text-align: left;
    }
  }
  &__status {
    margin-right: 0.25em;
  }
}
</style>
