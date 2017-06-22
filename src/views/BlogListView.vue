<template>
  <blog-view v-if="!filtered">

    <blog-notice :hide="false">
      <!-- @TODO Fetch data -->
      <h2 slot="header" class="fs-m">{{ $t(t.site.connect) }}</h2>
      <template slot="content">
        <newsletter-block class="blog-notice__form"
        :label="$t(t.site.newsletterSignUp)"
        :name="'notice-newsletter'"
        :button="$t(t.site.subscribe)"
        :action="newsletterSuccess"></newsletter-block>
        <div class="blog-notice__social social-links fs-s">
          <a v-for="platform of $store.getters['site/socialLinkables']"
            :href="platform.link"
            target="_blank">
            <img :src="platform.icon" :alt="$t(platform.title)">
          </a>
        </div>
      </template>
    </blog-notice>

    <blog-post class="list-complete-item"
      v-for="(post, i) of posts.slice(0,2)"
      :key="`unfiltered-${post.name}`"
      :post="post"></blog-post>

    <blog-notice>
       <!-- @TODO Make dynamic -->
      <h2 slot="header" class="fs-l">Enjoying M+ Stories?</h2>
      <p slot="content">Then here is a suggestion...</p>
    </blog-notice>

    <blog-post class="list-complete-item"
      v-for="(post, i) of posts.slice(2)"
      :key="`unfiltered-${post.name}`"
      :post="post"></blog-post>

    <button class="blog__button-wide"
      v-if="postsRemaining"
      @click="getMoreUnfiltered"
      v-text="morePostsText"></button>

  </blog-view>

  <blog-view v-else-if="!postsFiltered.length">
    <marq class="blog-item blog__marquee fs-l"
      :content="$t(t.blog.noPosts)"></marq>
  </blog-view>

  <blog-view v-else>

    <div class="blog-header fs-m">
      <div class="blog-header__descriptor" v-html="header.text"></div>
      <router-link class="blog-header__link" v-if="header.link" :to="{ name: 'blog' }" v-html="header.link"></router-link>
      <div class="blog-header__tags" v-if="header.tags">
        <tag class="fs-m" v-for="tag of header.tags" :key="tag.id" :tag="tag"></tag>
      </div>
    </div>

    <blog-post class="list-complete-item"
      v-for="(post, i) of postsFiltered"
      :key="`filtered-${post.name}`"
      :post="post"></blog-post>

    <button class="blog__button-wide"
      v-if="postsFilteredRemaining"
      @click="getMoreFiltered"
      v-text="morePostsText"></button>

  </blog-view>
  
</template>

<script>
import { mapState } from 'vuex';
import BlogView from './BlogView.vue';
import BlogNotice from '../components/BlogNotice.vue';
import BlogPost from '../components/BlogPost.vue';
import NewsletterBlock from '../components/NewsletterBlock.vue';
import Tag from '../components/Tag.vue';
import Marq from '../components/Marquee.vue';
import metaMixin from '../util/meta';
import { fetch } from '../util/fetch';

export default {
  mixins: [metaMixin],
  meta() {
    return {
      title: this.$t(this.$store.state.blog.meta.title),
      description: this.$t(this.$store.state.blog.meta.description),
    };
  },
  asyncData({ store, route }) {
    const config = {
      meta: false,
      filters: {
        category: false,
        author: false,
        tags: [],
      },
      selectors: [
        { name: 'expanded', value: 2 },
        { name: 'collapsed', value: 4 },
      ],
    };

    if (!store.state.blog.initialized.meta) {
      config.meta = true;
      config.selectors.push({ name: 'meta', value: true });
    }

    if (route.query) {
      if (route.query.author) {
        config.filters.author = route.query.author;
        config.selectors.push({ name: 'author', value: route.query.author });
      }
      if (route.query.category) {
        config.filters.category = route.query.category;
        config.selectors.push({ name: 'category', value: route.query.category });
      }
      if (route.query.tag) {
        config.filters.tags = route.query.tag;
        config.selectors.push({ name: 'tags', value: route.query.tag });
      }
    }

    return fetch(store, 'blog/asyncInit', config).then((response) => {
      store.dispatch('blog/init', config.filters);
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
    }),
    header() {
      const header = {};

      if (this.$store.getters['blog/activeCategory']) {
        header.text = ` ${this.$t(this.t.blog.postsUnder)}`;
        header.link = this.$t(this.$store.getters['blog/activeCategory'].title);
      } else if (this.$store.getters['site/activeAuthor']) {
        header.text = ` ${this.$t(this.t.blog.postsBy)}`;
        header.link = this.$t(this.$store.getters['site/activeAuthor'].title);
      } else if (this.$store.getters['site/tags/active']) {
        header.text = ` ${this.$t(this.t.blog.postsTagged)}`;
        header.tags = this.$store.getters['site/tags/active'];
      }
      return header;
    },
    morePostsText() {
      return this.loadingPosts ? this.$t(this.t.site.loading) : this.$t(this.t.blog.morePosts);
    },
    filtered() {
      return this.$store.getters['blog/filtered'];
    },
  },
  methods: {
    newsletterSuccess() {
      this.$modal.show('You are now subscribed to the newsletter!', 'Success');
    },
    getMoreUnfiltered() {
      return this.getMore(this.posts, 'posts', 'postsRemaining');
    },
    getMoreFiltered() {
      return this.getMore(this.postsFiltered, 'postsFiltered', 'postsFilteredRemaining');
    },
    getMore(currentPosts, items, remaining) {
      if (this.loadingPosts) return false;
      const q = this.query;
      const selectors = [
        { name: 'offset', value: currentPosts.length },
        { name: 'expanded', value: 0 },
        { name: 'collapsed', value: 6 },
      ];
      if (q) {
        if (q.author) selectors.push({ name: 'author', value: q.author });
        if (q.category) selectors.push({ name: 'category', value: q.category });
        if (q.tag) selectors.push({ name: 'tags', value: q.tag });
      }
      this.loadingPosts = true;
      this.$bar.start();
      return this.$store.dispatch('blog/getPosts', { items, remaining, selectors })
        .then(() => {
          this.loadingPosts = false;
          this.$bar.finish();
        })
        .catch((error) => {
          this.$modal.show(`${error.status}: ${error.data.errors[0]}`);
          this.loadingPosts = false;
          this.$bar.finish();
        });
    },
  },
  components: {
    BlogView,
    BlogNotice,
    BlogPost,
    NewsletterBlock,
    Tag,
    Marq,
  },
};
</script>
