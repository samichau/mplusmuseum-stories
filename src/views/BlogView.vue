<template>
  <main class="blog">

    <div class="header-push"></div>

    <div class="wrap wrap--wide">

      <div class="blog__content">

        <slot/>

      </div>

    </div>

  </main>
</template>

<script>
</script>

<style lang="less">
@import "../less/variables.less";

.blog {
  padding-top: 1em;
  &__overview {
    padding-bottom: 1em;
    .heading {
      text-align: center;
    }
  }
  &__loading {
    margin: 1em;
    text-align: center;
  }
  &__button {
    display: block;
    margin: 3em 0;
  }
  &__marquee {
    margin-top: 0.25em;
    font-style: italic;
    text-transform: uppercase;
  }
  &__category {
    display: inline-block;
    color: @grey;
    padding: 0.25em 0.5em;
    border: 1px solid @grey;
    border-radius: 0.25em;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    &:focus, &:hover {
      color: @black;
      border-color: @black;
    }
    &.blog__category--active {
      color: @accent;
      border-color: @accent;
    }
  }
}

.blog-item {
  position: relative;
  margin-top: 0;
  margin-left: auto;
  margin-bottom: 3em;
  margin-right: auto;
  width: 100%;
  .mq-sm({
    margin-bottom: 3em;
  });
  &__overlay {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &--notice {
    margin-top: 1em;
    .wrap {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

</style>
