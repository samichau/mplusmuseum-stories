<template>
  <div class="episode-list cf">

    <episode-card v-for="episode of episodes"
    :key="episode.id"
    :episode="episode"
    :series="episode.series"/>

  </div>  
</template>

<script>
import EpisodeCard from './EpisodeCard.vue';

export default {
  props: {
    content: {
      required: true,
    },
    limit: {
      default: false,
    },
  },
  computed: {
    episodes() {
      return this.limit ? this.content.slice(0, this.limit) : this.content;
    },
  },
  components: {
    EpisodeCard,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.episode-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .episode-card {
    flex-shrink: 0;
    width: 100%;
    .mq-sm({ width: 100% / 2; });
    .mq-lg({ width: 100% / 3; });
    .mq-xl({ width: 100% / 4; });
  }
  &--vertical {
    .episode-card {
      width: 100%;
    }
  }
}

</style>
