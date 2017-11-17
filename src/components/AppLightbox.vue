<template>
  <div class="lightbox">

    <button class="lightbox__close" @click="close"><img src="../assets/img/cross.svg" alt="Close"></button>

    <div class="lightbox__share">

      <share-bar v-if="share"
      class="sharebar--horizontal sharebar--reverse"
      :limit="0"
      :url="share.location"
      :title="share.title"/>

    </div>

    <div class="lightbox__inner">

      <div class="lightbox__content" @click="close">

        <img class="lazy"
        :src="imgObj.loading"
        v-lazy="imgObj"
        :alt="$t(image.alt)">

      </div>

      <div class="lightbox__footer">

        <div class="lightbox__caption fs-s fs-s-xs"
        v-html="$t(image.caption)"></div>

      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import ShareBar from './ShareBar.vue';

export default {
  created() {
    document.body.classList.add('modal-active');
    window.addEventListener('keydown', this.keyHandler);
  },
  destroyed() {
    document.body.classList.remove('modal-active');
    window.removeEventListener('keydown', this.keyHandler);
  },
  computed: {
    ...mapState('lightbox', [
      'share',
      'image',
    ]),
    imgObj() {
      return {
        src: this.image.src,
        loading: this.$placeholder.generate(this.image.dim, 'loading', 'transparent', '#aaa'),
        error: this.$placeholder.generate({
          width: 800,
          height: 500,
        }, 'error', 'transparent', 'red'),
      };
    },
  },
  methods: {
    close() {
      this.$store.commit('lightbox/close');
    },
    keyHandler(e) {
      if (e.keyCode === 27) this.close();
    },
  },
  components: {
    ShareBar,
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.lightbox {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, @lightboxBackground, fade(@lightboxBackground, 95%));
  color: @white;
  &__close, &__share {
    position: absolute;
    right: 0;
    padding: 0.5em;
  }
  &__close {
    top: 0;
    height: 2.5em;
    width: 2.5em;
    border: none;
    background: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__share {
    bottom: 0;
    .sharebar {
      margin-bottom: 0;
    }
  }
  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 2.5em 0.5em 0.5em;
    .mq-sm({
      padding: 2.5em 1.5em 0.5em;
    });
    img {
      cursor: zoom-out;
      min-width: 50%;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      font-family: 'object-fit: contain;';
    }
  }
  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.75em 3.5em 0.75em 0.75em;
  }
  &__caption {
    flex-grow: 1;
  }
}
</style>
