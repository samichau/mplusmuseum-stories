<template>
  <article class="article shadow--dark">

    <app-banner v-if="article.hero"
    :content="{ hero: article.hero }"
    @clicked="lightbox"/>
    
    <div class="article__content">

      <journal-article-header class="wrap"
      :article="article"
      :url="url"/>

      <div class="article__body cf" v-if="article.content">

        <content-blocks :items="article.content.list"/>

      </div>

      <interactive-scroll class="article__footer wrap"
      :trigger="onTrigger"
      :payload="article.id">

        <share-bar class="sharebar--horizontal"
        :url="url"
        :title="$t(article.title)"/>

        <app-footnotes class="article__footnotes"
        v-if="footnotes.length"
        :footnotes="footnotes"/>

      </interactive-scroll>

    </div>

  </article>
</template>

<script>
import AppFootnotes from '../components/AppFootnotes.vue';
import ContentBlocks from '../components/ContentBlocks.vue';
import JournalArticleHeader from '../components/JournalArticleHeader.vue';
import InteractiveScroll from '../components/InteractiveScroll.vue';
import ShareBar from '../components/ShareBar.vue';

export default {
  props: {
    article: {
      required: true,
    },
  },
  computed: {
    url() {
      const base = this.$store.state.site.url;
      const issue = this.article.issue.name;
      const article = this.article.name;
      return `${base}/${this.lang}/podium/${issue}/${article}/`;
    },
    footnotes() {
      if (!this.article.content) return [];
      const footnotes = [];
      this.article.content.list.forEach((block) => {
        if (block.content.footnotes) {
          block.content.footnotes[this.$store.state.lang].forEach((footnote) => {
            footnotes.push(footnote);
          });
        }
      });
      return footnotes;
    },
  },
  methods: {
    lightbox() {
      this.$store.commit('lightbox/open', {
        image: this.article.hero.content,
      });
    },
    onTrigger(payload) {
      this.$emit('triggered', payload);
    },
  },
  components: {
    AppFootnotes,
    ContentBlocks,
    InteractiveScroll,
    JournalArticleHeader,
    ShareBar,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.article {
  background: @lightgrey;
  &:first-of-type {
    box-shadow: none;
  }
  &__content {
    padding-top: 3em;
    padding-bottom: 3em;
    counter-reset: footnotes;
  }
  &__header {
    margin-bottom: 2em;
  }
  &__body {
    margin: 0 auto;
    max-width: @widthSmall * 1.5;
    .block {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1em;
      padding-left: 1em;
      padding-right: 1em;
      max-width: @widthSmall;
    }
    .block {
      &--wide {
        max-width: 100%;
      }
      &--left {
        float: left;
        width: 50%;
        margin: 0;
      }
      &--right {
        float: right;
        width: 50%;
        margin: 0;
      }
    }
  }
  &__footer {
    margin-top: 2em;
  }
  &__suggested {
    background: @lightgrey;
  }
  &__endnote {
    border: 2px solid @accent;
    padding: 1em;
    margin-top: 2em;
    margin-bottom: 2em;
  }
  &__trigger {
    height: 2em;
  }
  &__progress {
    background: @lightgrey;
    height: 2px;
    width: 100%;
    >div {
      width: 33.333%;
      height: 100%;
      background: @accent;
    }
  }
  &__footnotes {
    margin-top: 2em;
    margin-bottom: 0;
  }
  .banner {
    cursor: zoom-in;
  }
}
</style>