<template>
  <div class="sticky"
  :class="{ 'sticky--stuck': stuck }"
  :style="{
    height,
    opacity,
    visibility,
  }">
    <div class="sticky__content" :style="{
      top,
      width,
    }">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    fadeOut: {
      default: false,
    },
  },
  data() {
    return {
      stuck: false,
      overflows: false,
      contentHeight: 0,
      windowHeight: 0,
      height: null,
      opacity: null,
      visibility: null,
      top: null,
      width: null,
    };
  },
  mounted() {
    this.init();
    // Add load event listener as fix for iOS incorrectly calculating element height
    window.addEventListener('load', this.confirm, { once: true });
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('load', this.confirm);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const elementOverflows = this.getMeasurements();
        if (!elementOverflows && !this.stuck) this.stick();
        setTimeout(this.confirm, 1000);
      });
    },
    confirm() {
      if (this.stuck) this.$nextTick(this.stick);
    },
    shouldBeStuck() {
      const pos = this.$el.getBoundingClientRect().top;
      if ((pos + this.contentHeight) <= this.windowHeight) return pos;
      return false;
    },
    setHeight(offset = false) {
      const content = this.$slots.default[0].elm; // Only allows for single parent element in slot
      const h = content.offsetHeight
      + parseInt(window.getComputedStyle(content).marginTop, 10)
      + parseInt(window.getComputedStyle(content).marginBottom, 10);
      this.height = `${h}px`;
      if ((this.contentHeight > this.windowHeight) && offset) {
        this.top = `${offset}px`;
      } else {
        this.top = null;
      }
    },
    setWidth() {
      const w = this.$el.offsetWidth;
      this.width = `${w}px`;
    },
    getMeasurements() {
      this.contentHeight = this.$el.offsetHeight;
      this.windowHeight = Math.max(
        document.documentElement.clientHeight, window.innerHeight || 0);
      const overflows = this.contentHeight > this.windowHeight;
      this.overflows = overflows;
      return overflows;
    },
    stick(offset = false) {
      this.setWidth();
      this.setHeight(offset);
      this.stuck = true;
    },
    unstick() {
      this.height = null;
      this.top = null;
      this.width = null;
      this.stuck = false;
    },
    resize() {
      const elementOverflows = this.getMeasurements();
      const shouldBeStuck = this.shouldBeStuck();
      if (shouldBeStuck !== false && !elementOverflows) {
        this.stick();
      } else if (shouldBeStuck === false && this.stuck) {
        this.unstick();
      }
    },
    onScroll() {
      if (this.overflows) {
        const shouldBeStuck = this.shouldBeStuck();
        if (shouldBeStuck !== false && !this.stuck) {
          this.stick(shouldBeStuck);
        } else if (shouldBeStuck === false && this.stuck) {
          this.unstick();
        }
      }
      if (this.fadeOut !== false) this.handleFade();
    },
    handleFade() {
      const pos = window.scrollY || window.pageYOffset;
      const opacity = Math.max(1 - (pos / this.contentHeight), 0);
      const visibility = opacity === 0 ? 'hidden' : 'visible';
      this.opacity = opacity;
      this.visibility = visibility;
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.sticky {
  position: relative;
  &--stuck {
    .sticky__content {
      position: fixed;
    }
  }
}
</style>
