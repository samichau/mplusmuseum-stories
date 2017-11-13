<template>
  <main class="channel" v-if="channel">

    <div class="header-push"></div>

    <app-sticky fadeOut>

      <div class="channel__overview wrap wrap--wide">

        <div class="heading">

          <app-title-link class="app-title--same fs-l"
          wrap="h1"
          :title="channel.title"/>

        </div>
      
        <block-text :content="channel.blurb"/>

      </div>

    </app-sticky>

    <div class="channel__wrap">

      <div class="channel__fade"></div>

      <div class="channel__content">

        <div class="wrap wrap--full">

          <section class="channel__section"
          v-for="(section, i) in channel.content"
          :key="i">

            <section-header v-if="section.title"
            theme="dark"
            :title="$t(section.title)"/>

            <component class="channel__block"
            :is="section.type"
            :content="section.content"/>

          </section>

        </div>

      </div>

    </div>

  </main>
</template>

<script>
import meta from '../util/meta';
import AppSticky from '../components/AppSticky.vue';
import BannerDynamic from '../components/BannerDynamic.vue';
import EpisodeList from '../components/EpisodeList.vue';
import SectionHeader from '../components/SectionHeader.vue';

export default {
  mixins: [meta],
  meta() {
    const title = this.$t(this.$store.state.site.sections.channel);
    return {
      title,
      description: this.$t(this.channel.desc),
      image: this.channel.simulacrum,
      type: 'website',
      notice: {
        id: 'channel',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store }) {
    return store.dispatch('channel/init');
  },
  computed: {
    channel() {
      return this.$store.state.channel.page;
    },
  },
  methods: {

  },
  components: {
    AppSticky,
    Banner: BannerDynamic,
    List: EpisodeList,
    SectionHeader,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

@channelBackground: @dark;

.channel {
  background: @channelBackground;
  color: @white;
  &__overview {
    padding-top: 1em;
    padding-bottom: 1.5em;
    .heading {
      text-align: center;
    }
  }
  &__wrap {
    position: relative;
    z-index: 5;
    margin-top: -1.5em;
  }
  &__content {
    background: @channelBackground;
  }
  &__fade {
    height: 1.5em;
    background-image: linear-gradient(to top, @channelBackground, rgba(0, 0, 0, 0));
    width: 100%;
  }
  &__section {
    padding-bottom: 1.5em;
    padding-bottom: 3em;
  }
  &__block {
    .episode-card, &.episode-panel {
      box-shadow: @shadowStyleDark;
    }
  }
}

</style>
