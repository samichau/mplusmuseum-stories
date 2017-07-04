<template>
  <div class="marquee">
    <div class="marquee__wrap">
      <span class="marquee__content" v-html="computedContent"></span>
      <span class="marquee__duplicate" v-html="computedContent"></span>
    </div>
  </div>
</template>

<script>
import _repeat from 'lodash/repeat';

export default {
  computed: {
    computedContent() {
      // @TODO Improve this
      const n = Math.ceil(60 / this.content.length);
      return _repeat(`${this.content}&nbsp;`, n);
    },
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less">
.marquee {
  white-space: nowrap;
  overflow: hidden;
  &__wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    animation: marquee 20s linear infinite;
  }
  &__duplicate {
    left: 100%;
    position: absolute;
  }
  &:hover {
    .marquee__wrap {
      animation-play-state: paused;
    }
  }
}

@keyframes marquee {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}
</style>
