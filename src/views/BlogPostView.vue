<template>
  <blog-view v-if="post">
    <blog-post class="list-complete-item"
    :post="post"/>
    <router-link :to="{ name: 'blog' }" class="button button--wide button--outline blog__button">{{ $t($store.state.translations.blog.return) }}</router-link>
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
      notice: {
        id: 'blog',
        value: this.$t(this.$store.state.site.sections.blog),
        isTitle: true,
      },
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('blog/initPost', route.params);
  },
  computed: {
    post() {
      return this.$store.getters['blog/post'];
    },
  },
  components: {
    BlogView,
    BlogPost,
  },
};
</script>
