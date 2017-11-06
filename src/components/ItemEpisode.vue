<template>
  <div class="item item--episode">

    <div class="item__inner shadow shadow--small">

      <div class="item__media">

        <episode-card
        :episode="item"
        :series="item.series"
        showSection/>

      </div>

      <tag-group class="fs-s"
      :tagIds="item.tags"/>

    </div>

  </div>
</template>

<script>
import EpisodeCard from './EpisodeCard.vue';

export default {
  props: {
    item: {
      required: true,
    },
  },
  components: {
    EpisodeCard,
  },
};
</script>
