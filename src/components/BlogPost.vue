<template>
  <article class="blog-item blog-post shadow"
  :class="{ 'blog-post--collapsed': post.collapsed, 'blog-post--truncated': post.truncated }">
    <div class="blog-post__pinned"
    v-if="post.pinned && !$store.getters['blog/filtered']">
      <img src="../assets/img/pin.svg" alt="Pin Icon"> {{ $t(t.blog.pinned) }}
    </div>
    <div class="blog-post__header">
      <div class="blog-post__toggle" @click="expand">
        <div class="blog-post__prevent" v-if="post.collapsed"></div>
        <div class="blog-post__image"
        v-if="post.images.length"
        @click="openLightbox(post.images[0])">
          <img :src="post.images[0].thumb"
          :alt="$t(post.images[0].alt)">
        </div>
        <h1 class="blog-post__title fs-l"><dynamic-title :title="post.title"></dynamic-title></h1>
      </div>
      <div class="blog-post__meta">
        <byline :authorId="post.author"
        :date="post.date"
        :categoryId="post.category"></byline>
        <tags-inline v-if="post.tags.length"
        :tagIds="post.tags"></tags-inline>
        <div class="blog-post__excerpt fs-b"
        v-if="post.collapsed && post.excerpt">
          <div><span v-html="post.excerpt"></span> ...</div>
          <button class="button--reset" @click.prevent="expand">Read This...</button>
        </div>
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
          <content-blocks :items="sections"></content-blocks>
          
          <button class="blog-post__more button button--accent"
          v-if="post.truncated && post.sections.truncateAfter"
          @click="extend">{{ $t(t.site.continue) }}</button>

          <div class="blog-post__footer" v-if="showFooterContent">

            <div class="blog-post__footer-section blog-post__endnote fs-s"
            v-if="post.endnote"
            v-html="$t(post.endnote)"></div>

            <clipboard class="blog-post__footer-section"
            :url="shareData.location"></clipboard>

            <newsletter-block class="blog-post__footer-section input-wrap--inline"
            :label="$t($store.state.site.translations.newsletter.placeholder)"
            :name="`newsletter__${post.name}`"
            :button="'&rarr;<span class=\'sr-only\'>Subscribe to the M+ Stories Newsletter</span>'"></newsletter-block>

          </div>
        </div>
      </div>
    </div>

    <suggested class="blog-post__suggested"
    v-if="showFooterContent && post.related"
    :items="post.related.items"></suggested>

  </article>
</template>

<script>
import { mapState } from 'vuex';
import Byline from './Byline.vue';
import Clipboard from './Clipboard.vue';
import ContentBlocks from './ContentBlocks.vue';
import NewsletterBlock from './NewsletterBlock.vue';
import ShareBar from './ShareBar.vue';
import Suggested from './Suggested.vue';
import TagsInline from './TagsInline.vue';
import DynamicTitle from './DynamicTitle.vue';

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
        .then(() => { this.busy = false; })
        .catch((error) => {
          this.busy = false;
          this.$modal.error(error);
        });
    },
    extend() {
      this.$store.commit('blog/extendPost', this.post);
    },
  },
  components: {
    Byline,
    Clipboard,
    ContentBlocks,
    NewsletterBlock,
    ShareBar,
    Suggested,
    TagsInline,
    DynamicTitle,
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
  .clipboard {
    margin-top: 2em;
  }
  &__content {
    .mq-sm({
      display: flex;
    });
  }
  &__aside {
    transform: translate3d(0, 0, 0); // Fix for Chrome on Retina rendering bug;
  }
  &__excerpt {
    margin-top: 0.5em;
    button {
      margin-top: 0.5em;
    }
  }
  &__header {
    background: @white;
  }
  &__image {
    cursor: zoom-in;
    overflow: hidden;
    transition: 0.5s ease height;
    height: 250px;
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
    .ieOnly({
      top: 0 !important;
    });
    .edgeOnly({
      top: 0 !important;
    });
  }
  &__toggle {
    position: relative;
  }
  &__prevent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  &--collapsed {
    .blog-post {
      &__toggle {
        cursor: pointer;
        &:hover {
          color: @accent;
        }
      }
      &__image {
        cursor: pointer;
        height: 150px;
        .mq-sm({
          height: 300px;
        });
      }
      &__meta {
        padding-bottom: 1.5rem;
        .mq-sm({
          padding-bottom: 3rem;
        });
      }
    }
  }
}
</style>
