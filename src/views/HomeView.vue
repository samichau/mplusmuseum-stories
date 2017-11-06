<template>
  <main class="home" v-if="home">

    <div v-if="home.content[0].type !== 'banner'" class="header-push"></div>
    <!-- <div class="header-push"></div> -->

    <div v-for="section in home.content"
    class="home-section wrap wrap--full"
    :class="`home-section--${section.type}`"
    :key="section.id">

      <section-header v-if="section.title" :title="section.title"/>

      <component :is="`home-${section.type}`"
      :content="section.type === 'list' ? section : section.content"/>

    </div>

  </main>
</template>

<script>
import meta from '../util/meta';
import BannerDynamic from '../components/BannerDynamic.vue';
import HomeList from '../components/HomeList.vue';
import NoticeConnect from '../components/NoticeConnect.vue';
import NoticeExplore from '../components/NoticeExplore.vue';
import SectionHeader from '../components/SectionHeader.vue';

export default {
  mixins: [meta],
  meta() {
    return {
      title: false,
      description: false,
      image: '',
      type: 'website',
      notice: false,
    };
  },
  asyncData({ store }) {
    return store.dispatch('home/init');
  },
  computed: {
    home() {
      return this.$store.state.home.page;
    },
  },
  components: {
    HomeBanner: BannerDynamic,
    HomeList,
    HomeConnect: NoticeConnect,
    HomeExplore: NoticeExplore,
    SectionHeader,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.home {
  &__buttons {
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2em;
  }
}

.home-section {
  position: relative;
  overflow: hidden;
  padding-top: 1em;
  padding-bottom: 1em;
  background: @lightgrey;
  &__title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 2em;
    h2 {
      position: relative;
      z-index: 1;
      padding: 0 0.25em;
      background: @lightgrey;
    }
    &:after {
      position: absolute;
      z-index: 0;
      content: ' ';
      width: 100%;
      height: 1px;
      background: @black;
    }
  }
  &--banner {
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    padding: 0;
    background: @dark;
  }
  .notice-explore, .notice-connect {
    height: 8em;
  }
}

</style>
