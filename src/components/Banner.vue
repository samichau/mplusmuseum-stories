<template>
  <div class="banner" v-if="media">
    <div class="banner__text fs-xl f-b">
      <div class="header-push"></div>
      <dynamic-title class="dynamic-title--same" :title="media.caption" :wrap="'h1'" :block="true"></dynamic-title>
    </div>
    <div class="banner__media">
      <img v-if="data.images" :src="media.src" :alt="$t(media.alt)">
    </div>
  </div>
</template>

<script>
import DynamicTitle from './DynamicTitle.vue';

export default {
  props: {
    data: {
      required: true,
    },
  },
  computed: {
    media() {
      if (this.data.images) return this.data.images[0];
      return false;
    },
  },
  components: {
    DynamicTitle,
  },
};
</script>


<style lang="less">
@import "../less/variables.less";
@bannerSize: 100vh;

.banner, .page--fix-banner {
  position: relative;
  padding-top: @bannerSize / 2;
  .mq-sm({
    padding-top: @bannerSize / 3 * 2;
  });
  .mq-md({
    padding-top: @bannerSize * 0.75;
  });
}

.banner {
  &__text, &__media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__text {
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
    color: @white;
    padding: 0 1rem;
  }
  &__media {
    z-index: 1;
    background: @black;
    img {
      height: 100%;
      width: 100%;
      object-position: 50% 50%;
      object-fit: cover;
      font-family: 'object-fit: cover;';
    }
  }
}

.page--fix-banner {
  .banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .page__wrap {
    position: relative;
    z-index: 5;
  }
}

</style>

