<template>
  <a class="tag"
  :href="`/${$store.state.lang}/explore?tag=${tag.name}`"
  v-html="$t(tag.title)"
  @click.prevent="onClick"
  :aria-label="label"></a>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    tag: {
      type: Object,
    },
  },
  computed: {
    label() {
      if (this.tag.helper) {
        const helper = this.$t(this.tag.helper);
        if (helper.length > 0) return helper;
      }
      return null;
    },
  },
  methods: {
    onClick() {
      // If we are not in the explore route, just push the single tag
      if (this.$store.state.route.name !== 'explore') {
        return this.$router.push({ name: 'explore', query: { tag: this.tag.name } });
      }

      const activeTags = _.map(this.$store.getters['tags/active'], 'name');
      const newTags = _.includes(activeTags, this.tag.name)
        ? activeTags.filter(t => t !== this.tag.name)
        : activeTags.concat(this.tag.name);
      return this.$router.push({ name: 'explore', query: { tag: newTags } });
    },
  },
};
</script>
