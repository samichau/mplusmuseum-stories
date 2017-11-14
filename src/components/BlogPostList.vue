<script>
import _reduce from 'lodash/reduce';
import BlogPost from './BlogPost.vue';
import InteractiveWaypoints from './InteractiveWaypoints.vue';
import NoticeConnect from '../components/NoticeConnect.vue';

export default {
  props: {
    posts: {
      required: true,
    },
    notices: {
      default: false,
    },
    showing: {
      required: true,
    },
  },
  components: {
    BlogPost,
    InteractiveWaypoints,
    NoticeConnect,
  },
  methods: {
    updateURL(name = false) {
      let url = window.location.origin;
      const { route } = this.$store.state;
      const path = route.path.replace(/\/$/, '');
      url += `${path}/${name}`;
      window.history.replaceState(undefined, undefined, url);
    },
    updateNotice(post, el) {
      let scroll = 0;
      if (el) {
        const { top } = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scroll = (top + scrollTop) + 1;
      }
      this.$store.commit('header/updateNotice', {
        id: post.name,
        value: `${this.$t(this.$store.state.site.sections.blog)}: <span>${this.$t(post.title)}</span>`,
        isTitle: false,
        scroll,
      });
    },
    trigger(index) {
      const items = this.$refs.waypoints.$children;
      const item = items[index];
      if (item && item.post && item.post.name) {
        this.updateURL(item.post.name);
        this.updateNotice(item.post, item.$el);
      }
    },
    createNotice(h) {
      return h('aside', {
        class: 'blog-item blog-item--notice',
      }, [
        h('notice-connect'),
      ]);
    },
    createBlogPost(h, post, index) {
      return h('blog-post', {
        class: 'list-complete-item',
        key: `${this.showing}-${post.name}`,
        ref: `post-${index}`,
        props: {
          post,
        },
      });
    },
    createContentList(h) {
      const content = _reduce(this.posts, (items, post, index) => {
        if (typeof this.notices === 'object'
        && this.showing === 'unfiltered'
        && this.notices[index]) {
          items.push(this.createNotice(h));
        }
        items.push(this.createBlogPost(h, post));
        return items;
      }, []);
      return content;
    },
  },
  render(h) {
    const posts = this.createContentList(h);

    return h('interactive-waypoints', {
      props: {
        trigger: this.trigger,
      },
      ref: 'waypoints',
    }, posts);
  },
};
</script>
