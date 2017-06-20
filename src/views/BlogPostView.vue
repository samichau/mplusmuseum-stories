<template>
  <blog-view>
    <blog-post class="list-complete-item"
    :post="$store.state.blog.single"></blog-post>
    <router-link :to="{ name: 'blog' }" class="blog__button-wide">Return to Blog</router-link>
  </blog-view>
</template>

<script>
import BlogView from './BlogView.vue';
import BlogPost from '../components/BlogPost.vue';
import metaMixin from '../util/meta';
// import locales from '../locale';
import { fetch } from '../util/fetch';

export default {
  mixins: [metaMixin],
  meta() {
    return {
      title: this.$t(this.$store.state.blog.single.title),
      description: this.$t(this.$store.state.blog.single.desc),
    };
  },
  asyncData({ store, route }) {
    return fetch(store, 'blog/initSingle', route.params.name);
  },
  components: {
    BlogView,
    BlogPost,
  },
};
</script>
