<template>
  <div class="sticky"
  :class="{ 'sticky--stuck': stuck }"
  :style="styleObj">
    <div class="sticky__content" ref="content">
      <slot ref="content"></slot>
    </div>
    <div class="stick__spacer" ref="spacer"></div>
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
      styleObj: {},
    };
  },
  mounted() {
    this.stick();
    window.addEventListener('resize', this.stick);
    if (this.fadeOut) window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('resize', this.stick);
    if (this.fadeOut) window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    stick() {
      const content = this.$slots.default[0].elm; // Only allows for single parent element in slot
      const h = content.offsetHeight
        + parseInt(window.getComputedStyle(content).marginTop, 10)
        + parseInt(window.getComputedStyle(content).marginBottom, 10);
      const w = this.$el.offsetWidth;
      this.$refs.content.style.width = `${w}px`;
      this.$refs.spacer.style.height = `${h}px`;
      this.stuck = true;
    },
    handleScroll() {
      const pos = window.scrollY;
      const opacity = Math.max(1 - (pos / 500), 0);
      this.styleObj = {
        opacity,
      };
    },
  },
};
</script>

<style lang="less">
.sticky {
  position: relative;
  &--stuck {
    .sticky__content {
      position: fixed;
    }
  }
}
</style>
