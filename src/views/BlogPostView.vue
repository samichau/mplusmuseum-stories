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

export default {
  mixins: [meta],
  meta() {
    const hero = this.post.hero;
    const image = this.post.simulacrum
      || (hero && hero.type === 'image-block' && hero.content.length)
      ? hero.content[0].src
      : false;
    return {
      title: this.$t(this.post.title),
      description: this.$t(this.post.desc),
      image,
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
