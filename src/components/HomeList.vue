<template>
  <div class="home-list">

    <item-grid :content="items"
    :key="content.limit"/>

    <div class="home-list__button">

      <button class="button button--accent"
      v-if="truncated"
      @click="expand"
      v-html="$t($store.state.translations.site.viewMore)"></button>

    </div>

  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue';

export default {
  props: {
    content: {
      required: true,
    },
  },
  computed: {
    truncated() {
      return (this.content.limit && this.content.content.length > this.content.limit);
    },
    items() {
      if (!this.content.limit) return this.content.content;
      return this.content.content.slice(0, this.content.limit);
    },
  },
  methods: {
    expand() {
      this.$store.commit('home/expandList', this.content.id);
    },
  },
  components: {
    ItemGrid,
  },
};

</script>

<style lang="less">
.home-list {
  &__button {
    margin-top: 2em;
    margin-bottom: 2em;
    text-align: center;
  }
}
</style>
