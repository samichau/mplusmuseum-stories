<template>
  <main class="episode" v-if="episode">

    <div class="episode__video">

      <div class="header-push"></div>

      <div class="wrap wrap--wide">

        <block-brightcove :content="episode.video"
        :key="episode.id"
        :lazy="false"/>

      </div>

    </div>

    <div class="episode__content wrap wrap--wide">

      <app-panel>

        <div slot="content" class="panel__inner">

          <div class="heading">

            <app-title-link class="fs-l" :wrap="'h1'" :title="episode.title"/>

          </div>

          <tag-group class="fs-s fs-b-sm"
          :tagIds="episode.tags"/>

          <div class="row">

            <div class="col-sm-9">
              <content-blocks :items="episode.content.list"/>
            </div>

            <div class="col-sm-3">
              <block-text class="fs-s" :content="episode.credits"/>
            </div>
            
          </div>

          <share-bar class="sharebar--horizontal"
          :url="shareData.url"
          :title="shareData.title"/>

        </div>

      </app-panel>

      <app-panel class="panel--dark episode__series"
      v-if="episode.series && episode.series.episodes && episode.series.episodes.length">

        <template slot="content">

          <div class="panel__inner">

            <div class="heading">

              <snippet-translate tag="h3"
              class="fs-m"
              :snippet="$store.state.translations.channel.series"
              :data="{ series: episode.series.title }"
              :parsers="{ series: (s, h) => h('span', {}, $t(s)) }"/>

            </div>

            <block-text :content="episode.series.description"/>

          </div>

          <episode-list :content="episode.series.episodes"/>

        </template>

      </app-panel>

      <app-panel v-else>

        <app-suggested slot="content"
        :id="episode.id"/>

      </app-panel>

    </div>
    
  </main>
</template>

<script>
import meta from '../util/meta';
import AppSuggested from '../components/AppSuggested.vue';
import BlockBrightcove from '../components/BlockBrightcove.vue';
import ContentBlocks from '../components/ContentBlocks.vue';
import EpisodeList from '../components/EpisodeList.vue';
import ShareBar from '../components/ShareBar.vue';
import SnippetTranslate from '../components/SnippetTranslate.vue';

export default {
  mixins: [meta],
  meta() {
    return {
      title: this.$t(this.episode.title),
      description: this.$t(this.episode.desc),
      image: this.episode.simulacrum,
      type: 'article',
      notice: {
        id: 'channel',
        value: this.$t(this.$store.state.site.sections.channel),
        isTitle: true,
      },
    };
  },
  data() {
    return {
      suggested: false,
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('channel/initEpisode', {
      episode: route.params.episode,
    });
  },
  computed: {
    episode() {
      return this.$store.getters['channel/episode'];
    },
    shareData() {
      const base = this.$store.state.site.url;
      return {
        url: `${base}/${this.$store.state.lang}/channel/${this.episode.name}/`,
        title: this.$t(this.episode.title),
      };
    },
  },
  components: {
    AppSuggested,
    BlockBrightcove,
    ContentBlocks,
    EpisodeList,
    ShareBar,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.episode {
  &__video {
    background: @black;
    .brightcove-video {
      margin-bottom: 0;
    }
  }
  &__series {
    h3 {
      font-weight: @fontNormal;
      span {
        font-weight: @fontBold;
      }
    }
    .episode-list {
      justify-content: flex-start;
      .episode-card {
        width: 100%;
        .mq-sm({ width: 100% / 2; });
        .mq-lg({ width: 100% / 3; });
      }
    }
  }
  .row {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
}
</style>
