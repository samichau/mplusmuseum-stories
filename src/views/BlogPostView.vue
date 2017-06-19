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
import locales from '../locale';
import { fetch } from '../util/fetch';

export default {
  mixins: [metaMixin],
  meta() {
    return {
      title: this.$t(this.$store.state.blog.single.title),
      description: this.$t(this.$store.state.blog.single.desc),
    };
  },
  asyncData({ store, route, router }) {
    return new Promise((resolve, reject) => {
      fetch(store, 'blog/initSingle', route.params.name)
        .then(resolve)
        .catch((response) => {
          // If the promise didn't resolve, but the response status is 200
          // then we managed to resolve the site settings, so we can redirect to app 404
          if (response.status === 200) {
            router.replace({ name: 'not-found', params: { lang: locales[0] } });
            resolve(response);
          } else {
            reject(response);
          }
        });
    });
  },
  components: {
    BlogView,
    BlogPost,
  },
};
</script>
