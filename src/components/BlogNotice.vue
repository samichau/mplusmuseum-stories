<template>
  <aside class="blog-item blog-notice shadow"
  :class="{ 'blog-notice--hidden': hidden }">
    <div class="blog-item__overlay" v-if="hidden" @click.once="toggle"></div>
    <div class="blog-item__inner">
      <slot></slot>
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
    header: {
      default: '',
    },
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
  &__content {
    h1, h2, h3, h4, h5, h6 {
      font-size: 2.2rem;
      line-height: 1.2;
      .mq-sm({
        font-size: 2.5rem;
      });
      .mq-md({
        font-size: 2.8rem;
      });
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
    }
    h1, h2, h3, h4, h5, h6, p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__social {
    margin: 1.5rem auto 0;
  }
  form {
    text-align: left;
    width: 100%;
    margin: 1.5rem auto;
    position: relative;
    background: @white;
    .mq-sm({
      width: 90%;
    });
    label {
      padding: 0.5em;
      color: @black;
      line-height: 1.5;
      height: 2.5em;
    }
    input {
      height: 2.5em;
      padding: 0.5em;
      line-height: 1.5;
      color: @black;
      box-shadow: @shadowStyleInner;
    }
    .button-wrap {
      right: 0;
      top: 0;
      height: 100%;
      padding: 2px;
      position: absolute;
    }
    button {
      font-weight: 400;
      border: none;
      background: @accent;
      height: 100%;
      width: 100%;
      padding: 0 0.5em;
    }
  }
  .blog-item__inner {
    text-align: center;
    color: @white;
    background: @midgrey;
  }
}
</style>
