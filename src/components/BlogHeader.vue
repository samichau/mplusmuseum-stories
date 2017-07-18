<script>
import Tag from './Tag.vue';
import { dynamicTextMixin } from '../util/mixins';

export default {
  mixins: [dynamicTextMixin],
  components: {
    Tag,
  },
  computed: {
    activeCategory() {
      return this.$store.getters['blog/activeCategory'];
    },
    activeAuthor() {
      return this.$store.getters['site/activeAuthor'];
    },
    activeTags() {
      return this.$store.getters['site/tags/active'];
    },
    snippet() {
      const translations = this.$store.state.site.translations;
      if (this.activeCategory) {
        return this.$t(translations.blog.postsUnder);
      } else if (this.activeAuthor) {
        return this.$t(translations.blog.postsBy);
      } else if (this.activeTags) {
        return this.$t(translations.blog.postsTagged);
      }
      return false;
    },
  },
  methods: {
    renderAuthor(h) {
      return h(
        'router-link',
        {
          props: {
            to: { name: 'blog' },
          },
        },
        this.$t(this.activeAuthor.title),
      );
    },
    renderCategory(h) {
      return h(
        'router-link',
        {
          props: {
            to: { name: 'blog' },
          },
        },
        this.$t(this.activeCategory.title),
      );
    },
    renderTags(h) {
      const tags = this.activeTags.map(tag => h(
        'tag', {
          props: {
            key: tag.id,
            tag,
          },
        }),
      );
      return h(
        'div',
        { class: 'blog-header__tags' },
        tags,
      );
    },
    createStringElement(el, h) {
      return h('div', { class: 'blog-header__descriptor' }, el.str);
    },
  },
  render(h) {
    const elems = this.snippet.map(match => this.createElement(match, h));
    return h('div', { class: 'blog-header fs-m' }, elems);
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.blog-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1em;
  &-tags {
    margin: 0.125em -0.125em;
  }
  .tag {
    margin: 0.125em;
  }
  &__descriptor {
    white-space: pre;
  }
  >a {
    font-weight: 400;
    color: @accent;
  }
}
</style>
