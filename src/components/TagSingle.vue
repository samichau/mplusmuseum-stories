<template>
  <a class="tag"
  :href="`/${$store.state.lang}/explore?tag=${tag.name}`"
  v-html="$t(tag.title)"
  @click.prevent="onClick"></a>
</template>

<script>
import _includes from 'lodash/includes';
import _map from 'lodash/map';

export default {
  methods: {
    onClick() {
      // If we are not in the explore route, just push the single tag
      if (this.$store.state.route.name !== 'explore') {
        return this.$router.push({ name: 'explore', query: { tag: this.tag.name } });
      }

      const activeTags = _map(this.$store.getters['tags/active'], 'name');
      const newTags = _includes(activeTags, this.tag.name)
        ? activeTags.filter(t => t !== this.tag.name)
        : activeTags.concat(this.tag.name);
      return this.$router.push({ name: 'explore', query: { tag: newTags } });
    },
  },
  props: {
    tag: {
      type: Object,
    },
  },
};
</script>
