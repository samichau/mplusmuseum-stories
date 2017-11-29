<template>
  <div class="tags tags--inline" v-if="tags.length">

    <tag-single v-for="tag of calculatedTags"
    :key="tag.id"
    :tag="tag"/>

    <button class="tag tag--expand"
      v-if="calculatedTags.length < tags.length"
      @click="expanded = true">&hellip;</button>

  </div>
</template>

<script>
export default {
  props: {
    tagIds: {
      type: Array,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    tags() {
      return this.tagIds.map(id => this.$store.state.tags.entities[id]);
    },
    calculatedTags() {
      return this.expanded ? this.tags : this.tags.slice(0, 3);
    },
  },
};
</script>

<style lang="less">
.tags--inline {
  margin: -0.25rem;
}
</style>
