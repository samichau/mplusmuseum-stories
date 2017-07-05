<template>
  <div class="banner" v-if="media">
    <div class="banner__text fs-xl f-b">
      <div class="header-push"></div>
      <h2>
        <div class="lang-primary">{{ $t(media.caption) }} </div>
        <div class="lang-secondary">{{ $tt(media.caption) }}</div>
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

.banner {
  padding-top: 95%;
  position: relative;
  .mq-sm({
    padding-top: 70%;
  });
  .mq-md({
    padding-top: 55%;
  });
  .mq-lg({
    padding-top: 40%;
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
  margin-top: 95%;
  position: relative;
  .mq-sm({
    margin-top: 70%;
  });
  .mq-md({
    margin-top: 55%;
  });
  .mq-lg({
    margin-top: 40%;
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

