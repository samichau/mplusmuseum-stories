<template>
  <blog-view v-if="posts">

    <app-sticky fadeOut>

      <div class="blog__overview">

        <div class="heading">

          <app-title-link class="app-title--same fs-l"
          wrap="h1"
          :title="blog.title"/>

        </div>

        <block-text :content="blog.blurb"/>

        <div class="blog__categories fs-b">

          <router-link class="blog__category"
          :class="{'blog__category--active': cat.active }"
          v-for="cat in categories"
          :key="cat.id"
          :to="cat.name ? { name: 'blog', query: { category: cat.name } } : { name: 'blog' }"
          v-html="$t(cat.title)"/>

        </div>

        <app-marquee class="blog__marquee fs-m"
        v-if="!posts.length"
        :content="this.$t(this.t.blog.noPosts)"/>

      </div>
    
    </app-sticky>

    <template v-if="posts.length">

      <blog-post-list :posts="posts"
      :notices="$store.state.blog.notices"
      :showing="showing"/>

      <button class="button button--wide button--outline blog__button"
      v-if="remaining"
      @click="getMore"
      v-html="morePostsText"/>

    </template>
  
  </blog-view>
</template>

<script>
import { mapState } from 'vuex';
import AppMarquee from '../components/AppMarquee.vue';
import AppSticky from '../components/AppSticky.vue';
import BlogView from './BlogView.vue';
import BlogPostList from '../components/BlogPostList.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.blogTitle);
    return {
      title,
      description: this.$t(this.blog.desc),
      image: this.blog.simulacrum,
      type: 'website',
      notice: {
        id: 'blog',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('blog/initPosts', route.query);
  },
  data() {
    return {
      loadingPosts: false,
    };
  },
  computed: {
    ...mapState({
      t: s => s.translations,
      blog: s => s.blog.page,
      blogTitle: s => s.site.sections.blog,
      query: s => s.route.query,
      showing: s => s.blog.showing,
      category: s => s.blog.category,
    }),
    morePostsText() {
      return this.loadingPosts ? this.$t(this.t.site.loading) : this.$t(this.t.blog.morePosts);
    },
    categories() {
      return this.$store.getters['blog/categories'];
    },
    posts() {
      return this.$store.getters['blog/posts'];
    },
    remaining() {
      return this.$store.getters['blog/remaining'];
    },
  },
  methods: {
    getMore() {
      if (this.loadingPosts) return false;
      const type = this.showing;
      const selectors = {};
      selectors.offset = this.$store.state.blog[type].length;
      if (this.query && this.query.category) selectors.category = this.query.category;

      this.loadingPosts = true;
      this.$bar.start();

      return this.$store.dispatch('blog/getPosts', { type, selectors })
        .then(this.afterGetMore)
        .catch((error) => {
          this.afterGetMore();
          this.$modal.error(error);
        });
    },
    afterGetMore() {
      this.loadingPosts = false;
      this.$bar.finish();
      this.$triggerNative();
    },
  },
  components: {
    AppMarquee,
    AppSticky,
    BlogView,
    BlogPostList,
  },
};
</script>
