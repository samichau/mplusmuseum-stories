<template>
  <div class="banner-full" v-if="media">

    <div class="banner-full__text fs-xl f-b">

      <div class="header-push"></div>

      <app-title-link class="app-title--same" :title="media.caption" :wrap="'h1'" :block="true"/>

    </div>

    <div class="banner-full__media">

      <img v-if="data.images" :src="media.src" :alt="$t(media.alt)">

    </div>

  </div>
</template>

<script>
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
  },
};
</script>


<style lang="less">
@import "../less/variables.less";
@bannerSize: 100vh;

.banner-full, .page--fix-banner {
  position: relative;
  padding-top: @bannerSize / 2;
  .mq-sm({
    padding-top: @bannerSize / 3 * 2;
  });
  .mq-md({
    padding-top: @bannerSize / 4 * 3;
  });
}

.banner-full {
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
  .banner-full {
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
