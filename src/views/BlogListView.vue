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
    const selectors = {
      meta: false,
      expanded: 2,
      collapsed: 4,
      tags: [],
    };

    if (!store.state.blog.initialized.meta) selectors.meta = true;
    if (route.query) {
      if (route.query.author) selectors.author = route.query.author;
      if (route.query.category) selectors.category = route.query.category;
      if (route.query.tag) selectors.tags = route.query.tag;
    }

    return fetch(store, 'blog/asyncInit', selectors).then((response) => {
      store.dispatch('blog/init', selectors);
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
      notices: s => s.blog.notices,
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
      const selectors = {
        offset: currentPosts.length,
        expanded: 0,
        collapsed: 6,
      };
      if (q) {
        if (q.author) selectors.author = q.author;
        if (q.category) selectors.category = q.category;
        if (q.tag) selectors.tags = q.tag;
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

    const createNotice = (data) => {
      if (!data) return false;
      return h('blog-notice', {}, [
        h('div', {
          class: 'blog-notice__content',
          domProps: {
            innerHTML: this.$t(data.content),
          },
        }),
        data.newsletter ? createNewsletter() : false,
        data.social ? createLinks() : false,
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
      items = [this.posts.map((post, i) => {
        const content = [];
        const noticeData = this.notices[i];
        if (noticeData) {
          if (i === 0) {
            content.push(h('sticky', {
              props: {
                fadeOut: true,
              },
            }, [
              createNotice(noticeData),
            ]));
          } else {
            content.push(createNotice(noticeData));
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
