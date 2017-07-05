<script>
import { mapState } from 'vuex';
import BlogView from './BlogView.vue';
import BlogHeader from '../components/BlogHeader.vue';
import BlogNotice from '../components/BlogNotice.vue';
import BlogPost from '../components/BlogPost.vue';
import NewsletterBlock from '../components/NewsletterBlock.vue';
import Tag from '../components/Tag.vue';
import Marq from '../components/Marquee.vue';
import Sticky from '../components/Sticky.vue';
import meta from '../util/meta';
import { fetch } from '../util/fetch';

export default {
  mixins: [meta],
  meta() {
    return {
      title: this.$t(this.$store.state.blog.meta.title),
      description: this.$t(this.$store.state.blog.meta.description),
    };
  },
  asyncData({ store, route }) {
    const config = {
      meta: false,
      filters: {
        category: false,
        author: false,
        tags: [],
      },
      selectors: [
        { name: 'expanded', value: 2 },
        { name: 'collapsed', value: 4 },
      ],
    };

    if (!store.state.blog.initialized.meta) {
      config.meta = true;
      config.selectors.push({ name: 'meta', value: true });
    }

    if (route.query) {
      if (route.query.author) {
        config.filters.author = route.query.author;
        config.selectors.push({ name: 'author', value: route.query.author });
      }
      if (route.query.category) {
        config.filters.category = route.query.category;
        config.selectors.push({ name: 'category', value: route.query.category });
      }
      if (route.query.tag) {
        config.filters.tags = route.query.tag;
        config.selectors.push({ name: 'tags', value: route.query.tag });
      }
    }

    return fetch(store, 'blog/asyncInit', config).then((response) => {
      store.dispatch('blog/init', config.filters);
      return response;
    });
  },
  data() {
    return {
      loadingPosts: false,
    };
  },
  computed: {
    ...mapState({
      t: s => s.site.translations,
      query: s => s.route.query,
      posts: s => s.blog.posts,
      postsRemaining: s => s.blog.postsRemaining,
      postsFiltered: s => s.blog.postsFiltered,
      postsFilteredRemaining: s => s.blog.postsFilteredRemaining,
    }),
    morePostsText() {
      return this.loadingPosts ? this.$t(this.t.site.loading) : this.$t(this.t.blog.morePosts);
    },
    filtered() {
      return this.$store.getters['blog/filtered'];
    },
  },
  methods: {
    getMoreUnfiltered() {
      return this.getMore(this.posts, 'posts', 'postsRemaining');
    },
    getMoreFiltered() {
      return this.getMore(this.postsFiltered, 'postsFiltered', 'postsFilteredRemaining');
    },
    getMore(currentPosts, items, remaining) {
      if (this.loadingPosts) return false;
      const q = this.query;
      const selectors = [
        { name: 'offset', value: currentPosts.length },
        { name: 'expanded', value: 0 },
        { name: 'collapsed', value: 6 },
      ];
      if (q) {
        if (q.author) selectors.push({ name: 'author', value: q.author });
        if (q.category) selectors.push({ name: 'category', value: q.category });
        if (q.tag) selectors.push({ name: 'tags', value: q.tag });
      }
      this.loadingPosts = true;
      this.$bar.start();
      return this.$store.dispatch('blog/getPosts', { items, remaining, selectors })
        .then(() => {
          this.loadingPosts = false;
          this.$bar.finish();
        })
        .catch((error) => {
          this.$modal.error(error);
          this.loadingPosts = false;
          this.$bar.finish();
        });
    },
  },
  components: {
    BlogView,
    BlogHeader,
    BlogNotice,
    BlogPost,
    NewsletterBlock,
    Tag,
    Marq,
    Sticky,
  },
  render(h) {
    let items = [];

    const createLinks = () => h('div', { class: 'blog-notice__social social-links fs-s' },
      this.$store.getters['site/socialLinkables'].map((platform) => {
        const img = h('img', {
          domProps: {
            src: platform.icon,
            alt: this.$t(platform.title),
          },
        });
        return h('a', {
          key: platform.name,
          domProps: {
            href: platform.link,
            target: '_blank',
          },
        }, [img]);
      }),
    );

    const createNewsletter = () => h('newsletter-block', {
      class: 'blog-notice__form',
      props: {
        label: this.$t(this.t.newsletter.placeholder),
        name: 'notice-newsletter',
        button: this.$t(this.t.newsletter.subscribe),
      },
    });

    const createNotice = (index) => {
      const notice = this.$store.state.blog.notices[index];
      if (!notice) return false;
      return h('blog-notice', {}, [
        h('div', {
          class: 'blog-notice__content',
          domProps: {
            innerHTML: this.$t(notice.content),
          },
        }),
        notice.newsletter ? createNewsletter() : false,
        notice.social ? createLinks() : false,
      ]);
    };

    if (this.filtered) {
      if (this.postsFiltered.length) {
        // If we want to show filtered posts and we have some to show ...
        // Create the more button element if we haven't got all the posts
        const moreBtn = this.postsFilteredRemaining
          ? h('button', {
            class: 'blog__button-wide',
            on: {
              click: this.getMoreFiltered,
            },
          }, this.morePostsText)
          : false;

        // Create the posts list, for now we don't put notice elements here
        items = [
          h('blog-header'),
          this.postsFiltered.map(post =>
            h('blog-post', {
              class: 'list-complete-item',
              key: `filtered-${post.name}`,
              props: {
                post,
              },
            },
            )),
          moreBtn,
        ];
      } else {
        // But if we don't have any filtered posts, just show the marquee element
        items = [
          h('marq', {
            class: 'blog-item blog__marquee fs-l',
            props: {
              content: this.$t(this.t.blog.noPosts),
            },
          }),
        ];
      }
    } else {
      // If we are showing unfiltered posts
      // Create the more button element if we haven't got all the posts
      const moreBtn = this.postsRemaining
        ? h('button', {
          class: 'blog__button-wide',
          on: {
            click: this.getMoreUnfiltered,
          },
        }, this.morePostsText)
        : false;

      // Create the posts list by looping through the posts and inserting
      // notice elements where appropriate
      const notices = this.$store.state.blog.notices;
      items = [this.posts.map((post, i) => {
        const content = [];
        const notice = notices[i];
        if (notice) {
          if (i === 0) {
            content.push(h('sticky', {
              props: {
                fadeOut: true,
              },
            }, [
              createNotice(i),
            ]));
          } else {
            content.push(createNotice(i));
          }
        }

        content.push(h('blog-post', {
          class: 'list-complete-item',
          key: `unfiltered-${post.name}`,
          props: {
            post,
          },
        }));

        return content;
      }), moreBtn];
    }

    return h('blog-view', {}, items);
  },
};
</script>
