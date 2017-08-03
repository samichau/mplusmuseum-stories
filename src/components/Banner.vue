<template>
  <div class="banner" v-if="media">
    <div class="banner__text fs-xl f-b">
      <div class="header-push"></div>
      <h2>
        <div class="lang-primary" v-html="$t(media.caption)"></div>
        <div class="lang-secondary" v-html="$tt(media.caption)"></div>
      </h2>
    </div>
    <div class="banner__media">
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
};
</script>


<style lang="less">
@import "../less/variables.less";
@bannerSize: 40%;
@bannerIncrement: 12.5%;

.banner {
  padding-top: @bannerSize + @bannerIncrement * 3;
  position: relative;
  .mq-sm({
    padding-top: @bannerSize + @bannerIncrement * 2;
  });
  .mq-md({
    padding-top: @bannerSize + @bannerIncrement * 1;
  });
  .mq-lg({
    padding-top: @bannerSize;
  });
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
  padding-top: @bannerSize + @bannerIncrement * 3;
  position: relative;
  .mq-sm({
    padding-top: @bannerSize + @bannerIncrement * 2;
  });
  .mq-md({
    padding-top: @bannerSize + @bannerIncrement * 1;
  });
  .mq-lg({
    padding-top: @bannerSize;
  });
  .banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
}

</style>

