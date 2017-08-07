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
import Waypoints from '../components/Waypoints.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    return {
      title: this.$t(this.section.title),
      description: this.$t(this.section.desc),
      image: this.section.simulacrum,
      type: 'website',
    };
  },
  asyncData({ store, route }) {
    const selectors = {
      meta: false,
      tags: [],
    };

    if (!store.state.blog.initialized.meta) selectors.meta = true;
    if (route.query) {
      if (route.query.author) selectors.author = route.query.author;
      if (route.query.category) selectors.category = route.query.category;
      if (route.query.tag) selectors.tags = route.query.tag;
    }

    return store.dispatch('blog/asyncInit', selectors).then((response) => {
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
      posts: s => s.blog.posts,
      postsRemaining: s => s.blog.postsRemaining,
      postsFiltered: s => s.blog.postsFiltered,
      postsFilteredRemaining: s => s.blog.postsFilteredRemaining,
      section: s => s.blog.section,
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
      };
      if (q) {
        if (q.author) selectors.author = q.author;
        if (q.category) selectors.category = q.category;
        if (q.tag) selectors.tags = q.tag;
      }
      this.loadingPosts = true;
      this.$bar.start();
      return this.$store.dispatch('blog/getPosts', { items, remaining, selectors })
        .then(this.afterGetMore)
        .catch((error) => {
          this.afterGetMore();
          this.$modal.error(error);
        });
    },
    afterGetMore() {
      this.loadingPosts = false;
      this.$bar.finish();
      this.$nextTick(() => {
        this.$store.dispatch('site/triggerNativeEvent', 'resize');
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
    Waypoints,
  },
  render(h) {
    let items = [];
    let posts = [];

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

    const createMoreButton = fn => h('button', {
      class: 'blog__button-wide',
      on: {
        click: fn,
      },
    }, this.morePostsText);

    const createNotice = (data) => {
      if (!data) return false;
      return h('blog-notice', {
        props: {
          notice: data,
        },
      }, [
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
          ? createMoreButton(this.getMoreFiltered)
          : false;

        // Create the posts list, for now we don't put notice elements here
        items.push(h('blog-header'));
        posts = this.postsFiltered;
        posts.forEach((post, i) =>
          items.push(h('blog-post', {
            class: 'list-complete-item',
            key: `filtered-${post.name}`,
            postIndex: i,
            props: {
              post,
            },
          },
          )));
        if (moreBtn) items.push(moreBtn);
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
        ? createMoreButton(this.getMoreUnfiltered)
        : false;

      // Create the posts list by looping through the posts and inserting
      // notice elements where appropriate
      posts = this.posts;
      posts.forEach((post, i) => {
        const noticeData = this.section.notices[i];
        if (noticeData && noticeData.visible) {
          if (i === 0) {
            items.push(h('sticky', {
              props: {
                fadeOut: true,
              },
            }, [
              createNotice(noticeData),
            ]));
          } else {
            items.push(createNotice(noticeData));
          }
        }

        items.push(h('blog-post', {
          class: 'list-complete-item',
          key: `unfiltered-${post.name}`,
          postIndex: i,
          props: {
            post,
          },
        }));
      });
      if (moreBtn) items.push(moreBtn);
    }

    const funcToCall = (index) => {
      const component = items[index];
      const route = this.$store.state.route;
      let url = window.location.origin;
      if (component && component.data && typeof component.data.postIndex !== 'undefined') {
        const post = posts[component.data.postIndex];
        url += `${route.path}/${post.name}`;
      } else {
        url += route.fullPath;
      }
      window.history.replaceState(undefined, undefined, url);
    };

    const waypoints = h('waypoints', {
      props: {
        trigger(index) {
          funcToCall(index);
        },
      },
    }, items);

    return h('blog-view', {}, [waypoints]);
  },
};
</script>
