<template>
  <main class="view--article">

    <div v-if="!articles[0].hero" class="header-push"></div>

    <interactive-waypoints :trigger="enteredNewSection">

      <journal-article v-for="(article, i) of articles"
      :article="article"
      :key="article.id"
      :ref="`article-${i}`"
      @triggered="onArticleTrigger"/>

    </interactive-waypoints>

    <app-suggested v-if="articleIDs.length === article.issue.articles.length"
    :id="suggestedData.id"
    :omit="suggestedData.omit"/>

  </main>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import AppSuggested from '../components/AppSuggested.vue';
import InteractiveWaypoints from '../components/InteractiveWaypoints.vue';
import JournalArticle from '../components/JournalArticle.vue';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    const notice = {
      id: this.article.name,
      value: `${this.$t(this.journalTitle)}: <span>${this.$t(this.article.title)}</span>`,
      isTitle: false,
    };
    return {
      title: this.$t(this.article.title),
      description: this.$t(this.article.desc),
      image: this.article.simulacrum,
      type: 'article',
      notice,
    };
  },
  data() {
    return {
      articleIDs: [],
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('journal/initArticle', route.params);
  },
  created() {
    this.articleIDs = [this.article.id];
    this.index = 0;
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    getArticleElFromIndex(index) {
      const articleRef = this.$refs[`article-${index}`];
      if (articleRef) return articleRef[0].$el;
      return false;
    },
    // @TODO Refactor into waypoints module, current implementation inefficient
    // e.g. multiple scroll event handlers, gets element heights on each event
    scrollHandler: _.throttle(function updateProgressBar() {
      let percent = 0;
      if (this.index >= 0) {
        const articleEl = this.getArticleElFromIndex(this.index);
        if (articleEl) {
          const top = articleEl.offsetTop;
          const height = articleEl.clientHeight;
          const windowHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.getElementsByTagName('body')[0];
          const pos = window.scrollY;
          const posInArticle = pos - top;
          percent = (posInArticle / (height - windowHeight)) * 100;
        }
      }
      percent = Math.max(Math.min(percent, 100), 0);
      return this.setProgress(percent);
    }, 15),
    onArticleTrigger(id) {
      const issueArticles = this.article.issue.articles;

      if (this.articleIDs.length < issueArticles.length) {
        // Still articles to get
        const index = _.findIndex(issueArticles, article => article.id === id);
        return this.getNextArticle(index, issueArticles)
          .then(() => {
            setTimeout(this.$triggerNative, 500);
          });
      }

      return false;
    },
    getNextArticle(index, issueArticles) {
      const nextIndex = (index < issueArticles.length - 1) ? index + 1 : 0;
      const nextArticle = issueArticles[nextIndex];
      const nextArticleInStore = this.storeArticles[nextArticle.id];

      if (!nextArticleInStore) {
        const payload = {
          issue: this.article.issue.name,
          article: nextArticle.name,
        };

        return this.$store.dispatch('journal/getArticle', payload)
          .then((response) => {
            this.articleIDs.push(nextArticle.id);
            return response;
          });
      }

      return Promise.resolve(this.articleIDs.push(nextArticle.id));
    },
    enteredNewSection(i) {
      this.index = i;
      const articleId = this.articleIDs[i];
      if (articleId) {
        const article = this.storeArticles[articleId];
        this.updateNotice(article, this.getArticleElFromIndex(i));
        this.updateURL(article);
      }
    },
    updateNotice(article, el) {
      let scroll = 0;
      if (el) {
        const { top } = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scroll = (top + scrollTop) + 1;
      }
      this.$store.commit('header/updateNotice', {
        id: article.name,
        value: `${this.$t(this.journalTitle)}: <span>${this.$t(article.title)}</span>`,
        isTitle: false,
        scroll,
      });
    },
    updateURL(article) {
      const { route } = this.$store.state;
      const url = `${window.location.origin}/${route.params.lang}/podium/${route.params.issue}/${article.name}`;
      window.history.replaceState(undefined, undefined, url);
    },
    setProgress(val) {
      this.$bar.setFloat(val);
    },
  },
  computed: {
    ...mapState({
      journalTitle: s => s.site.sections.journal,
      storeArticles: s => s.journal.articles,
    }),
    article() {
      return this.$store.getters['journal/article'];
    },
    articles() {
      return this.articleIDs.map(id => this.storeArticles[id]);
    },
    suggestedData() {
      return {
        id: this.article.id,
        omit: this.article.issue.articles.map(article => article.id),
      };
    },
  },
  components: {
    AppSuggested,
    InteractiveWaypoints,
    JournalArticle,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";


</style>
