<template>
  <div class="sticky"
  :class="{ 'sticky--stuck': stuck }"
  :style="styles">
    <div class="sticky__content" :style="contentStyles">
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
      measurements: {
        height: 0,
        windowHeight: 0,
      },
      styles: {
        height: 'inherit',
        opacity: 'inherit',
        visibility: 'inherit',
      },
      contentStyles: {
        top: 'inherit',
        width: 'inherit',
      },
    };
  },
  mounted() {
    this.init();
    // Add load event listener as fix for iOS incorrectly calculating element height
    window.addEventListener('load', this.init, { once: true });
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('load', this.init);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init() {
      const elementOverflows = this.getMeasurements();
      if (!elementOverflows && !this.stuck) this.stick();
    },
    shouldBeStuck() {
      const pos = this.$el.getBoundingClientRect().top;
      if ((pos + this.measurements.height) <= this.measurements.windowHeight) return pos;
      return false;
    },
    setHeight(offset = false) {
      const content = this.$slots.default[0].elm; // Only allows for single parent element in slot
      const h = content.offsetHeight
      + parseInt(window.getComputedStyle(content).marginTop, 10)
      + parseInt(window.getComputedStyle(content).marginBottom, 10);
      this.styles.height = `${h}px`;
      if ((this.measurements.height > this.measurements.windowHeight) && offset) {
        this.contentStyles.top = `${offset}px`;
      } else {
        this.contentStyles.top = 'inherit';
      }
    },
    setWidth() {
      const w = this.$el.offsetWidth;
      this.contentStyles.width = `${w}px`;
    },
    getMeasurements() {
      this.measurements.height = this.$el.offsetHeight;
      this.measurements.windowHeight = Math.max(
        document.documentElement.clientHeight, window.innerHeight || 0);
      const overflows = this.measurements.height > this.measurements.windowHeight;
      this.overflows = overflows;
      return overflows;
    },
    stick(offset = false) {
      this.setWidth();
      this.setHeight(offset);
      this.stuck = true;
    },
    unstick() {
      this.styles.height = 'inherit';
      this.contentStyles.top = 'inherit';
      this.contentStyles.width = 'inherit';
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
      if (this.fadeOut) this.handleFade();
    },
    handleFade() {
      const pos = window.scrollY || window.pageYOffset;
      const opacity = Math.max(1 - (pos / 350), 0);
      const visibility = opacity === 0 ? 'hidden' : 'visible';
      this.styles.opacity = opacity;
      this.styles.visibility = visibility;
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
