<template>
  <button class="marquee"
  :class="{
    'marquee--reverse': reverse,
    'marquee--paused': paused,
  }"
  @click="paused = !paused">

    <h5 class="marquee__wrap">

      <span class="marquee__calc"
      ref="calc"
      v-html="content"
      aria-hidden="true"/>

      <span class="marquee__content"
      ref="content"
      v-html="computedContent"
      :aria-label="content"/>

      <span class="marquee__duplicate"
      ref="duplicate"
      v-html="computedContent"
      aria-hidden="true"/>

    </h5>

  </button>
</template>


<script>
import _ from 'lodash';

export default {
  data() {
    return {
      contentWidth: false,
      loaded: false,
      paused: false,
      windowWidth: false,
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
      return _.repeat(`${this.content}&nbsp;`, this.count);
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
@import '../less/variables.less';

.marquee {
  outline: none;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 0;
  &__wrap {
    font-weight: @fontNormal;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    animation: marquee 45s linear infinite;
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
      animation: marquee-reverse 45s linear infinite;
    }
  }
  &:hover, &:focus {
    .marquee__wrap {
      animation-play-state: paused;
    }
  }
  &--paused {
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
