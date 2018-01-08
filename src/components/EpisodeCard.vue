<template>
  <router-link class="episode-card"
  :to="{ name: 'episode', params: { episode: episode.name } }">

    <div class="episode-card__wrap">

      <div class="episode-card__inner">

        <div class="episode-card__media" v-if="episode.card">

          <img v-if="episode.card.type === 'image'"
          class="lazy"
          :src="imgObj.loading"
          v-lazy="imgObj"
          :alt="$t(episode.card.content.alt)">

          <video v-else-if="episode.card.type === 'video'"
          :src="episode.card.content.src"
          autoplay muted loop></video>

        </div>

        <div class="episode-card__info">

          <app-section-label v-if="showSection !== false"
          type="episode"/>

          <app-title class="episode-card__title fs-m"
          wrap="h4"
          :title="episode.title"/>

          <div class="episode-card__meta fs-s">

            <template v-if="series !== false">
              <img src="../assets/img/play.svg" alt="Series">&thinsp;<span v-html="$t(series.title)"></span>&ensp;
            </template>

            <img src="../assets/img/clock.svg" alt="Duration">&thinsp;<span v-html="$t(episode.duration)"></span>

          </div>

        </div>

      </div>

    </div>

  </router-link>
</template>

<script>
export default {
  props: {
    episode: {
      required: true,
    },
    series: {
      default: false,
    },
    showSection: {
      default: false,
    },
  },
  computed: {
    imgObj() {
      const { content } = this.episode.card;
      return {
        src: content.src,
        loading: this.$placeholder.generate(content.dim, 'loading', 'black', 'white'),
      };
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.episode-card {
  display: block;
  color: @white;
  &__wrap {
    position: relative;
    padding-top: 72.5%;
  }
  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__media {
    position: relative;
    background: @black;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.25s ease opacity;
    img, video {
      display: block;
      width: 100%;
      height: 100%;
      object-position: 50% 50%;
      object-fit: cover;
      font-family: 'object-fit: cover;';
    }
  }
  &__info {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 1em;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 90%);
  }
  &__meta {
    img {
      height: 0.75em;
      width: 0.75em;
    }
  }
  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.5em;
    line-height: 1;
  }
  &:hover, &:focus {
    outline: none;
    .episode-card__media {
      opacity: 1 / 3 * 2;
    }
  }
}
</style>
