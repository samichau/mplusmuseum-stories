<template>
  <snippet-translate class="byline"
  :snippet="this.snippet"
  :data="{ author, categories, date }"
  :parsers="{
    author: parseAuthor,
    categories: parseCategories,
    date: parseDate,
  }"/>
</template>

<script>
import _ from 'lodash';
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  props: {
    snippet: {
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    date: {
      type: Object,
    },
    author: {
      type: Number,
    },
    link: {
      default: true,
    },
  },
  methods: {
    parseAuthor(id, h) {
      if (!id) return false;
      const author = this.$store.state.site.authors[id];
      return this.link ? h(
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
      ) : h('span', {}, this.$t(author.title));
    },
    // Blog only
    parseCategories(categories, h) {
      if (!categories.length) return false;
      const seperator = { en: ', ', tc: '，' };
      return _.reduce(categories, (arr, category, index) => {
        const content = this.$t(category.title);
        if (this.link) {
          const data = { props: { to: { name: 'blog', query: { category: category.name } } } };
          arr.push(h('router-link', data, content));
        } else {
          arr.push(content);
        }
        // Add separator between list elements
        if (index < categories.length - 1) arr.push(this.$t(seperator));
        return arr;
      }, []);
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
