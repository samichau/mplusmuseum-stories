<template>
  <div class="endnote-block block">
    <component class="endnote-block__content fs-s" :is="rendered"></component>
  </div>
</template>


<script>
import _find from 'lodash/find';
import { dynamicTextMixin } from '../util/mixins';

export default {
  mixins: [dynamicTextMixin],
  props: {
    content: {
      required: true,
    },
  },
  methods: {
    renderAuthor() {
      const author = _find(this.$store.state.site.authors,
        a => a.id === this.$parent.$parent.post.author);
      return `<router-link :to="{ query: { author: '${author.name}' } }">${this.$t(author.title)}</router-link>`;
    },
  },
  computed: {
    rendered() {
      const lang = this.$store.state.lang;
      const elems = this.content.dynamic[lang].map(match => this.createElement(match));
      return {
        template: `<div>${elems.join('')}</div>`,
      };
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.endnote-block {
  margin-top: 2em;
  border: 1px solid @accent;
  &__content {
    padding: 1em;
  }
}
</style>
