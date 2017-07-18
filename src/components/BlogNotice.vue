<template>
  <aside class="blog-item blog-notice shadow">
    <button class="blog-notice__close fs-b" @click="hide"><img src="../assets/img/cross.svg" alt="Close"></button>
    <div class="blog-item__inner">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    notice: {
      required: true,
    },
  },
  methods: {
    hide() {
      this.notice.visible = false;
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
  &__close {
    height: 2.25em;
    width: 2.25em;
    padding: 0.75em;
    line-height: 1;
    opacity: 0.25;
    border: none;
    background: none;
    position: absolute;
    right: 0;
    top: 0;
    color: @white;
    transition: .15s ease opacity;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover, &:focus {
      opacity: 1;
    }
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
    a {
      color: @white;
      text-decoration: underline;
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
