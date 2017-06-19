<template>
  <aside class="blog-item blog-notice shadow"
    :class="{ 'blog-notice--hidden': hidden }">
    <div class="blog-item__overlay" v-if="hidden" @click.once="toggle"></div>
    <div class="blog-item__inner">
      <div class="blog-notice__header">
        <slot name="header"></slot>
      </div>
      <div class="blog-notice__content">
        <slot name="content"></slot>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      hidden: this.hide,
    };
  },
  props: {
    hide: {
      default: false,
    },
  },
  methods: {
    toggle() {
      if (this.hide) this.hidden = !this.hidden;
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.blog-notice {
  position: relative;
  z-index: 0;
  transform-origin: 50% 0%;
  &--hidden {
    margin-bottom: -12rem;
    transform: scale(0.9);
    transition: 0.2s ease transform;
    &:hover {
      transform: scale(0.9125);
    }
  }
  &:not(.blog-notice--hidden):not(.fade-enter-active):not(.fade-leave-active) {
    transition: 0.5s cubic-bezier(.5,-0.6,.4,.9) transform, 0.5s cubic-bezier(.5,-0.6,.4,.9) margin-bottom;
  }
  &__header {
    margin-bottom: 1.5rem;
  }
  form {
    width: 100%;
    margin: 1.5rem auto;
    position: relative;
    .mq-sm({
      width: 90%;
    });
    .button-wrap {
      right: 0;
      top: 0;
      height: 100%;
      padding: 2px;
      position: absolute;
    }
    button {
      border: none;
      background: @accent;
      height: 100%;
      width: 100%;
      padding: 0 0.5em;
    }
  }
  input {
    padding: 1rem;
    color: @black;
    border: none;
    width: 100%;
  }
  .blog-item__inner {
    text-align: center;
    color: @white;
    background: @midgrey;
  }
}
</style>
