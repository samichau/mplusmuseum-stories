<template>
  <div class="search-filter">

    <div class="search-filter__buttons">

      <app-dropdown :options="filterOptions"
      defaultButtonText="Show All Content"
      :selected.sync="activeFilter"/>
    
      <app-dropdown :options="sortOptions"
      defaultButtonText="Sort by Newest"
      :selected.sync="activeSort"/>

    </div>

  </div>
</template>

<script>
import _map from 'lodash/map';
import AppDropdown from './AppDropdown.vue';

export default {
  computed: {
    translations() {
      return this.$store.state.translations;
    },
    filterOptions() {
      const opts = this.$store.state.search.filters;
      return _map(opts, name => ({
        title: this.$t(this.$store.state.translations.content[name]).many,
        value: name,
      }));
    },
    sortOptions() {
      return this.$store.state.search.sorts;
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
.search-filter {
  margin-bottom: 1.5em;
  &__buttons {
    display: flex;
    .app-dropdown {
      margin-right: 1em;
    }
  }
}
</style>
