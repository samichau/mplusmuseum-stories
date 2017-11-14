<template>
  <snippet-translate class="byline"
  :snippet="this.snippet"
  :data="{ author, category, date }"
  :parsers="{
    author: parseAuthor,
    category: parseCategory,
    date: parseDate,
  }"/>
</template>

<script>
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  props: {
    snippet: {
      required: true,
    },
    category: {
      default: false,
      type: [Object, Boolean],
    },
    date: {
      type: Object,
    },
    author: {
      type: Number,
    },
  },
  methods: {
    parseAuthor(id, h) {
      if (!id) return false;
      const author = this.$store.state.site.authors[id];
      return h(
        'router-link',
        {
          props: {
            to: {
              name: 'search',
              query: {
                q: this.$t(author.title),
              },
            },
          },
        },
        this.$t(author.title),
      );
    },
    // Blog only
    parseCategory(category, h) {
      return category ? h(
        'router-link',
        {
          props: {
            to: {
              name: 'blog',
              query: {
                category: category.name,
              },
            },
          },
        },
        this.$t(category.title),
      ) : false;
    },
    parseDate(date, h) {
      if (!date) return false;
      return h(
        'span',
        {},
        this.$t(date),
      );
    },
  },
  components: {
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.byline {
  margin: 0.5em 0;
  a {
    font-weight: @fontBold;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
