<template>
  <div class="progress fs-b">

    <div class="progress__bar"
    :class="{ 'progress__bar--animate': canAnimate }"
    :style="{
      'width': percent+'%',
      'background-color': canSuccess? color : failedColor,
      'opacity': show ? 1 : 0
    }"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      show: false,
      canAnimate: true,
      canSuccess: true,
      duration: 3000,
      color: '#ffffff',
      failedColor: '#ff0000',
    };
  },
  methods: {
    start() {
      this.show = true;
      this.canAnimate = true;
      this.canSuccess = true;
      if (this._timer) {
        clearInterval(this._timer);
        this.percent = 0;
      }
      this._cut = 10000 / Math.floor(this.duration);
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random());
        if (this.percent > 95) {
          this.finish();
        }
      }, 100);
      return this;
    },
    set(num) {
      this.show = true;
      this.canSuccess = true;
      this.canAnimate = true;
      this.percent = Math.floor(num);
      return this;
    },
    setFloat(num) {
      this.show = true;
      this.canSuccess = true;
      this.canAnimate = false;
      this.percent = num;
      return this;
    },
    get() {
      return Math.floor(this.percent);
    },
    increase(num) {
      this.percent = this.percent + Math.floor(num);
      return this;
    },
    decrease(num) {
      this.percent = this.percent - Math.floor(num);
      return this;
    },
    finish() {
      this.percent = 100;
      this.hide();
      return this;
    },
    pause() {
      clearInterval(this._timer);
      return this;
    },
    hide() {
      clearInterval(this._timer);
      this._timer = null;
      setTimeout(() => {
        this.show = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    },
    fail() {
      this.canSuccess = false;
      return this;
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.progress {
  position: fixed;
  top: @hSm * 11;
  .mq-sm({ top: @hMd * 11; });
  .mq-lg({ top: @hLg * 11; });
  margin-top: -3px;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 @hSm * 1;
  .mq-sm({ padding: 0 @hMd * 1; });
  .mq-lg({ padding: 0 @hLg * 1; });
  z-index: 102;
  pointer-events: none;
  &__bar {
    height: 3px;
    opacity: 1;
    width: 0%;
    &--animate {
      transition: width 0.2s ease, opacity 0.2s;
    }
  }
}
</style>
