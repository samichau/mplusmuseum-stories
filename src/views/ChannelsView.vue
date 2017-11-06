<template>
  <main class="channels" v-if="channels">

    <div class="header-push"></div>

    <app-sticky fadeOut>

      <div class="channels__overview wrap wrap--wide">

        <div class="heading">

          <app-title-link class="app-title--same fs-l"
          wrap="h1"
          :title="channels.title"/>

        </div>
      
        <block-text :content="channels.blurb"/>

      </div>

    </app-sticky>

    <div class="channels__wrap">

      <div class="channels__fade"></div>

      <div class="channels__content">

        <div class="wrap wrap--full">

          <section class="channels__section"
          v-for="(section, i) in channels.content"
          :key="i">

            <section-header v-if="section.title"
            theme="dark"
            :title="$t(section.title)"/>

            <component class="channels__block"
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
    const title = this.$t(this.$store.state.site.sections.channels);
    return {
      title,
      description: this.$t(this.channels.desc),
      image: this.channels.simulacrum,
      type: 'website',
      notice: {
        id: 'channels',
        value: title,
        isTitle: true,
      },
    };
  },
  asyncData({ store }) {
    return store.dispatch('channels/init');
  },
  computed: {
    channels() {
      return this.$store.state.channels.page;
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

@channelsBackground: @dark;

.channels {
  background: @channelsBackground;
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
    background: @channelsBackground;
  }
  &__fade {
    height: 1.5em;
    background-image: linear-gradient(to top, @channelsBackground, rgba(0, 0, 0, 0));
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
