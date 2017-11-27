<template>
  <div class="explore__section" v-if="sorts.length">

    <div class="heading explore__options">

      <h3 class="fs-b">
      
        <span v-html="prefixText"/>

        <span class="explore__option"
        v-for="sort of sorts"
        :key="sort.id"
        v-if="shouldShow(sort.id)">

          <button @click="setSort(sort.id)"
          :class="{ selected: sort.id === activeSort.id }"
          v-html="$t($store.state.translations.explore[sort.id])"></button>

        </span>

      </h3>

    </div>

    <div class="explore__tags fs-m"
    :key="activeSort.id">

      <tag-single v-for="tagId in activeSort.tags"
      :key="tagId"
      :tag="tags[tagId]"/>

    </div>

  </div>
</template>

<script>
export default {
  computed: {
    prefixText() {
      return this.$t(this.$store.state.translations.explore.sorts);
    },
    sorts() {
      return this.$store.getters['explore/sorts'];
    },
    activeSort() {
      return this.$store.getters['explore/activeSort'];
    },
    tags() {
      return this.$store.state.tags.entities;
    },
  },
  methods: {
    setSort(id) {
      this.$store.commit('explore/setSort', id);
    },
    shouldShow(id) {
      if (this.$store.state.lang === 'tc' && id === 'alphabetical') {
        return false;
      }
      return true;
    },
  },
};
</script>
