<template>
  <a class="tag"
    :class="{ 'tag--active': tag.active }"
    :href="`?tag=${tag.name}`"
    @click.stop.prevent="toggle">{{ $t(tag.title) }}</a>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
    },
  },
  methods: {
    toggle() {
      const activeTags = this.$store.getters['site/tags/active'].map(t => t.name);
      const newTags = this.tag.active
        ? activeTags.filter(t => t !== this.tag.name)
        : activeTags.concat(this.tag.name);
      this.$router.push({ name: 'blog', query: { tag: newTags } });
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.tag {
  font-weight: 400;
  display: inline-block;
  padding: 0.4rem 0.6rem;
  line-height: 1;
  border: 1px solid @accent;
  background-color: @white;
  color: @accent;
  margin: 0.25rem;
  box-shadow: @shadowStyleSmall;
  transition: .5s ease color, .5s ease background-color;
  &--active {
    color: @white;
    background-color: @accent;
    &:after {
      content: '\00d7';
      opacity: 0.66;
      display: inline-block;
      vertical-align: middle;
      margin-left: 0.25em;
      height: 0.15em;
      line-height: 0;
      font-size: 85%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
