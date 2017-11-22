<template>
  <div class="search-filter">

    <div class="search-filter__buttons">

      <app-dropdown :options="filterOptions"
      :defaultButtonText="$t(translations.search.filterDefault)"
      :selected.sync="activeFilter"/>
    
      <app-dropdown :options="sortOptions"
      :defaultButtonText="$t(translations.search.sortDefault)"
      :selected.sync="activeSort"/>

    </div>

  </div>
</template>

<script>
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import AppDropdown from './AppDropdown.vue';

export default {
  computed: {
    translations() {
      return this.$store.state.translations;
    },
    filterOptions() {
      const opts = [
        'article',
        'basic',
        'documentation',
        'episode',
        'exhibition',
        'issue',
        'post',
      ];
      const options = _map(opts, name => ({
        title: this.$t(this.translations.content[name]).many,
        value: name,
      }));
      return _sortBy(options, 'title');
    },
    sortOptions() {
      return [
        {
          title: this.$t(this.translations.search.sortType),
          value: {
            by: 'type',
            order: 'asc',
          },
        },
        {
          title: this.$t(this.translations.search.sortOldest),
          value: {
            by: 'modified',
            order: 'asc',
          },
        },
      ];
    },
    activeSort: {
      get() {
        return this.$store.state.search.sort;
      },
      set(param) {
        this.$store.commit('search/setSort', param);
      },
    },
    activeFilter: {
      get() {
        return this.$store.state.search.filter;
      },
      set(param) {
        this.$store.dispatch('search/filter', param);
      },
    },
  },
  components: {
    AppDropdown,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.search-filter {
  margin-bottom: 1em;
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    .app-dropdown {
      margin-bottom: 0.5em;
      .mq-sm({
        margin-right: 1em;
      });
    }
  }
}
</style>
