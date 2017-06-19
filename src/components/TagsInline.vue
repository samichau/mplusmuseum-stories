<template>
  <div class="tags tags--inline">
    <tag v-for="tag of calculatedTags" :key="tag.id" :tag="tag"></tag>
    <button class="tag tag--expand"
      v-if="calculatedTags.length < tags.length"
      @click="expanded = true">...</button>
  </div>
</template>

<script>
import Tag from './Tag.vue';

export default {
  props: {
    tagIds: {
      type: Array,
    },
  },
  data() {
    return {
      expanded: false,
      tags: this.$store.state.site.tags.items.filter(tag => this.tagIds.includes(tag.id)),
    };
  },
  computed: {
    calculatedTags() {
      return this.expanded ? this.tags : this.tags.slice(0, 3);
    },
  },
  components: {
    Tag,
  },
};
</script>

<style lang="less">
.tags--inline {
  margin: -0.25rem;
}
</style>
