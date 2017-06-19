<template>
  <div class="marquee">
    <div class="marquee__wrap">
      <span class="marquee__content" v-html="computedContent"></span>
      <span class="marquee__duplicate" v-html="computedContent"></span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    computedContent() {
      // @TODO Improve this
      const n = Math.ceil(60 / this.content.length);
      return `${this.content}&nbsp;`.repeat(n);
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
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
