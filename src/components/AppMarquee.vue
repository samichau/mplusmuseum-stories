<template>
  <div class="marquee" :class="{ 'marquee--reverse': reverse }">

    <div class="marquee__wrap">

      <span class="marquee__calc" ref="calc" v-html="content"></span>

      <span class="marquee__content" ref="content" v-html="computedContent"></span>

      <span class="marquee__duplicate" ref="duplicate" v-html="computedContent"></span>

    </div>

  </div>
</template>


<script>
import _repeat from 'lodash/repeat';

export default {
  data() {
    return {
      loaded: false,
      windowWidth: false,
      contentWidth: false,
    };
  },
  mounted() {
    this.calculateWidths();
    window.addEventListener('resize', this.calculateWidths);
    this.loaded = true;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateWidths);
  },
  computed: {
    count() {
      if (!this.windowWidth || !this.contentWidth) return 1;
      const count = Math.ceil(this.windowWidth / this.contentWidth);
      return count;
    },
    computedContent() {
      return _repeat(`${this.content}&nbsp;`, this.count);
    },
  },
  methods: {
    calculateWidths() {
      this.contentWidth = this.$refs.calc.offsetWidth;
      this.windowWidth = window.innerWidth || document.documentElement.clientWidth;
    },
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    reverse: {
      default: false,
    },
  },
  watch: {
    $route() {
      this.calculateWidths();
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
    animation: marquee 30s linear infinite;
  }
  &__calc {
    position: absolute;
    visibility: hidden;
  }
  &__duplicate {
    left: 100%;
    position: absolute;
  }
  &--reverse {
    .marquee__duplicate {
      left: -100%;
    }
    .marquee__wrap {
      animation: marquee-reverse 30s linear infinite;
    }
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

@keyframes marquee-reverse {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(100%, 0, 0); }
}
</style>
