<template>
  <div class="home-list">

    <item-grid :content="content.content"
    :rows="rows"
    :buttonText="$tl('site.viewMore')"
    @expand="expand"/>

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
    rows() {
      const full = Math.ceil(this.content.limit / 4);
      const mobile = full * 2;
      const rows = [mobile, full];
      return rows;
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
