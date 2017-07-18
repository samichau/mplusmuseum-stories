<template>
  <blog-view>
    <blog-post class="list-complete-item"
    :post="post"></blog-post>
    <router-link :to="{ name: 'blog' }" class="blog__button-wide">Return to Blog</router-link>
  </blog-view>
</template>

<script>
import BlogView from './BlogView.vue';
import BlogPost from '../components/BlogPost.vue';
import meta from '../util/meta';
import { fetch } from '../util/fetch';

export default {
  mixins: [meta],
  meta() {
    return {
      title: this.$t(this.post.title),
      description: this.$t(this.post.desc),
      image: this.post.hero.images && this.post.hero.images.length ? this.post.hero.images[0].src : '',
    };
  },
  asyncData({ store, route }) {
    return fetch(store, 'blog/initSingle', route.params.name);
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
