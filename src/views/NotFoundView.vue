<template>
  <div class="not-found">

    <div class="header-push"></div>

    <div class="not-found__inner">

      <div class="wrap wrap--x-wide">

        <h1 class="fs-l"><app-title-link class="app-title--same" :title="notfound.title"/></h1>

      </div>

      <div class="wrap" v-if="image">

        <img class="lazy"
        :src="image.loading"
        v-lazy="image"
        :alt="$t(notfound.image.alt)">

        <div v-if="notfound.image.caption"
        class="not-found__image-caption fs-xs fs-s-sm"
        v-html="$t(notfound.image.caption)"></div>


      </div>

      <div class="wrap wrap--x-wide">

        <div class="fs-m" v-html="$t(notfound.body.html)"></div>

      </div>

    </div>

  </div>
</template>

<script>
import { Response } from '../api';
import meta from '../util/meta';

export default {
  mixins: [meta],
  meta() {
    return {
      title: '404',
      description: 'The requested resource could not be found.',
      notice: false,
    };
  },
  asyncData() {
    return Promise.resolve(new Response(true));
  },
  computed: {
    notfound() {
      return this.$store.state.site.notfound;
    },
    image() {
      const { image } = this.notfound;
      return image ? {
        src: image.src,
        loading: this.$placeholder.generate(image.dim, 'loading', '#000', '#fff'),
      } : false;
    },
  },
  components: {
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.not-found {
  background: @accent;
  color: @white;
  .wrap {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  &__inner {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      display: block;
      width: 100%;
    }
  }
  &__image-caption {
    text-align: left;
    margin-top: 0.25em;
  }
}

</style>
