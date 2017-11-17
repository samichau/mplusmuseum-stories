<template>
  <div class="image-block block"
  :class="modifierClass">

    <img class="lazy"
    :src="imgObj.loading"
    v-lazy="imgObj"
    :alt="$t(content.alt)"
    @click="lightbox">

    <div v-if="caption"
    class="image-block__caption fs-xs fs-s-sm"
    v-html="$t(content.caption)"></div>

  </div>
</template>

<script>
import { blockMixin } from '../util/mixins';

export default {
  mixins: [blockMixin],
  props: {
    content: {
      required: true,
    },
    caption: {
      default: true,
    },
  },
  computed: {
    imgObj() {
      const { thumb } = this.content;
      return {
        src: thumb.src,
        loading: this.$placeholder.generate(thumb.dim),
      };
    },
  },
  methods: {
    lightbox() {
      this.$store.commit('lightbox/open', { image: this.content });
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.image-block {
  img {
    width: 100%;
    cursor: zoom-in;
    display: block;
    margin: 0 auto;
  }
  &__caption {
    margin: 1rem 0;
    color: @midgrey;
  }
}
</style>
