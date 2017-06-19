<template>
  <main class="blog">
    <div class="header-push"></div>
    <div class="blog__content row">
      <section class="blog__posts col-sm-9">
        <slot></slot>
      </section>
      <blog-sidebar class="col-sm-3"></blog-sidebar>
    </div>
  </main>
</template>

<script>
import BlogSidebar from '../components/BlogSidebar.vue';

export default {
  components: {
    BlogSidebar,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.blog {
  background: @lightgrey;
  padding: 4rem 0 1rem;
  &__content {
    max-width: 1280px;
    margin: 0 auto;
  }
  &__loading {
    margin: 1em;
    text-align: center;
  }
  &__button-wide {
    font-weight: 400;
    display: block;
    width: 100%;
    margin: 6rem 0;
    border: 1px solid @grey;
    text-align: center;
    padding: 0.5em;
    color: @accent;
    // @TODO Clean this class up if we no longer need to animate
    background-color: transparent;
    background-image: linear-gradient(90deg, @accent 100%, transparent 0%);
    background-size: 0% 100%;
    background-repeat: no-repeat;
    // transition: 0.25s ease all;
    &:hover {
      // background: @accent;
      color: @white;
      border-color: @accent;
      background-size: 100% 100%;
    }
  }
  &__marquee {
    font-style: italic;
    text-transform: uppercase;
  }
}

.blog-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1em;
  &-tags {
    margin: 0.125em -0.125em;
  }
  .tag {
    margin: 0.125em;
  }
  div {
    margin-right: 0.25em;
  }
  span {
    font-weight: 400;
    color: @accent;
  }
}

.blog-item {
  position: relative;
  margin-top: 0;
  margin-left: auto;
  margin-bottom: 2rem;
  margin-right: auto;
  width: 100%;
  .mq-sm({
    margin-bottom: 4rem;
  });
  &__inner {
    background: @white;
    padding: 1.5rem;
    .mq-sm({
      padding: 3rem;
    });
  }
  &__overlay {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

</style>
