<template>
  <article class="blog-item blog-post shadow"
  :class="{ 'blog-post--collapsed': post.collapsed, 'blog-post--truncated': post.truncated }">
    <div class="blog-post__pinned"
    v-if="post.pinned && !$store.getters['blog/filtered']">
      <img src="../assets/img/pin.svg" alt="Pin Icon"> {{ $t(t.blog.pinned) }}
    </div>
    <div class="blog-post__header">
      <div class="blog-post__toggle" @click="expand">
        <div class="blog-post__image"
        v-if="post.images.length"
        @click="openLightbox(post.images[0])">
          <img :src="post.images[0].thumb"
          :alt="$t(post.images[0].alt)"
          data-object-fit="cover">
        </div>
        <h1 class="blog-post__title fs-l">
          <span class="lang-primary" v-html="$t(post.title)"></span>&thinsp;<span class="lang-secondary" v-html="$tt(post.title)"></span>
        </h1>
      </div>
      <div class="blog-post__meta">
        <byline :authorId="post.author"
        :date="post.date"
        :categoryId="post.category"></byline>
        <tags-inline v-if="post.tags.length"
        :tagIds="post.tags"></tags-inline>
      </div>
    </div>

    <div class="blog-item__inner" v-if="!post.collapsed">
      <div class="blog-post__content row">

        <div class="blog-post__aside col-md-3">
          <share-bar class="blog-post__sharebar"
          :url="shareData.location"
          :title="$t(post.title)"></share-bar>
        </div>

        <div class="blog-post__body fs-b col-md-9">
          <component v-for="(section, i) of sections"
          :key="i"
          :is="section.type"
          :content="section.content"></component>
          
          <button class="blog-post__more button button--accent"
          v-if="post.truncated && post.sections.truncateAfter"
          @click="extend">{{ $t(t.site.continue) }}</button>

          <div class="blog-post__footer" v-if="showFooterContent">

            <div class="blog-post__footer-section blog-post__endnote fs-s"
            v-if="post.endnote"
            v-html="$t(post.endnote)"></div>

            <clipboard class="blog-post__footer-section"
            :url="shareData.location"></clipboard>

            <newsletter-block class="blog-post__footer-section"></newsletter-block>

          </div>
        </div>
      </div>
    </div>

    <suggested class="blog-post__suggested"
    v-if="showFooterContent"
    :items="post.related.items"></suggested>

  </article>
</template>

<script>
import { mapState } from 'vuex';
import Byline from './Byline.vue';
import Clipboard from './Clipboard.vue';
import ImageBlock from './ImageBlock.vue';
import Instagram from './Instagram.vue';
import NewsletterBlock from './NewsletterBlock.vue';
import ShareBar from './ShareBar.vue';
import Suggested from './Suggested.vue';
import TagsInline from './TagsInline.vue';
import TextBlock from './TextBlock.vue';
import Tweet from './Tweet.vue';
import Youtube from './YouTube.vue';

export default {
  data() {
    return {
      busy: false,
    };
  },
  props: {
    post: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      t: s => s.site.translations,
      lang: s => s.lang,
      url: s => s.site.url,
    }),
    sections() {
      if (this.post.sections) {
        if (this.post.truncated && this.post.sections.truncateAfter) {
          return this.post.sections.list.slice(0, this.post.sections.truncateAfter);
        }
        return this.post.sections.list;
      }
      return [];
    },
    shareData() {
      return {
        location: `${this.url}/${this.lang}/blog/${this.post.name}`,
        title: this.$t(this.post.title),
      };
    },
    showFooterContent() {
      return !this.post.truncated && !this.post.collapsed;
    },
  },
  methods: {
    openLightbox(image) {
      if (!this.post.collapsed) this.$store.commit('lightbox/open', { image, share: this.shareData });
    },
    collapse() {
      const postTop = this.$el.offsetTop;
      window.scrollTo(0, postTop);
      this.$store.commit('blog/collapsePost', this.post);
    },
    expand() {
      if (this.busy || !this.post.collapsed) return false;
      this.busy = true;
      return this.$store.dispatch('blog/expandPost', this.post)
        .then(() => { this.busy = false; });
    },
    extend() {
      this.$store.commit('blog/extendPost', this.post);
    },
  },
  components: {
    Byline,
    Clipboard,
    ImageBlock,
    Instagram,
    NewsletterBlock,
    ShareBar,
    Suggested,
    TagsInline,
    TextBlock,
    Tweet,
    Youtube,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.blog-post {
  z-index: 1;
  img {
    max-width: 100%;
  }
  &__content {
    .mq-sm({
      display: flex;
    });
  }
  &__header {
    background: @white;
  }
  &__image {
    cursor: zoom-in;
    overflow: hidden;
    transition: 0.5s ease height;
    height: 300px;
    .mq-sm({
      height: 600px;
    });
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      font-family: 'object-fit: cover;';
    }
  }
  &__more {
    margin-top: 1.5rem;
    .mq-sm({
      margin-top: 3rem;
    });
  }
  &__pinned {
    font-weight: 400;
    text-align: center;
    padding: 1rem;
    background: @accent;
    color: @white;
    line-height: 1;
    img {
      display: inline-block;
      vertical-align: top;
      height: 1em;
    }
  }
  &__title {
    margin-bottom: 1rem;
    padding: 1.5rem 1.5rem 0;
    .mq-sm({
      padding: 3rem 3rem 0;
    });
  }
  &__meta {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .mq-sm({
      padding-left: 3rem;
      padding-right: 3rem;
    })
  }
  &__footer-section {
    margin: 3rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__endnote {
    border: 1px solid @accent;
    padding: 1rem;
  }
  &__sharebar {
    position: relative;
    .mq-sm({
      top: 7rem;
      left: 0;
      position: sticky;
    });
  }
  &--collapsed {
    .blog-post {
      &__toggle {
        cursor: pointer;
      }
      &__image {
        height: 300px;
        cursor: pointer;
      }
      &__meta {
        padding-bottom: 1.5rem;
        .mq-sm({
          padding-bottom: 3rem;
        });
      }
    }
  }
  // &--truncated {
  //   .blog-post {
  //     &__sharebar {
  //       position: static;
  //     }
  //   }
  // }
}
</style>
