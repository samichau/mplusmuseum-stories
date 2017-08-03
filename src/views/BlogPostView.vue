<template>
  <blog-view>
    <blog-post class="list-complete-item"
    :post="post"></blog-post>
    <router-link :to="{ name: 'blog' }" class="blog__button-wide">{{ $t($store.state.site.translations.blog.return) }}</router-link>
  </blog-view>
</template>

<script>
import BlogView from './BlogView.vue';
import BlogPost from '../components/BlogPost.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    return {
      title: this.$t(this.post.title),
      description: this.$t(this.post.desc),
      image: this.post.simulacrum,
      type: 'article',
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('blog/initSingle', route.params.name);
  },
  computed: {
    post() {
      return this.$store.state.blog.single;
    },
  },
  components: {
    BlogView,
    BlogPost,
  },
};
</script>
