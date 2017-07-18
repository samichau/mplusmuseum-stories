<script>
import _find from 'lodash/find';
import { dynamicTextMixin } from '../util/mixins';

export default {
  mixins: [dynamicTextMixin],
  props: {
    categoryId: {
      default: false,
      type: [Number, Boolean],
    },
    date: {
      type: Object,
    },
    authorId: {
      type: Number,
    },
  },
  computed: {
    snippet() {
      return this.$t(this.$store.state.site.translations.blog.byline);
    },
    category() {
      return _find(this.$store.state.blog.section.categories,
        category => category.id === this.categoryId);
    },
    author() {
      return _find(this.$store.state.site.authors, author => author.id === this.authorId);
    },
  },
  methods: {
    renderAuthor(h) {
      return h(
        'router-link',
        {
          props: {
            to: { query: { author: this.author.name } },
          },
        },
        this.$t(this.author.title),
      );
    },
    renderCategory(h) {
      return this.category ? h(
        'router-link',
        {
          props: {
            to: { query: { category: this.category.name } },
          },
        },
        this.$t(this.category.title),
      ) : false;
    },
    renderDate(h) {
      return h(
        'span',
        {},
        this.$t(this.date),
      );
    },
  },
  render(h) {
    const elems = this.snippet.map(match => this.createElement(match, h));
    return h('div', { class: 'byline fs-b' }, elems);
  },
};
</script>

<style lang="less">
.byline {
  margin: 0.5em 0;
  a {
    font-weight: 400;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
