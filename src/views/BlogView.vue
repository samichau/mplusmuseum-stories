<template>
  <main class="blog">
    <div class="header-push"></div>
    <div class="blog__content row">
      <section class="blog__posts col-md-9">
        <slot></slot>
      </section>
      <blog-sidebar class="col-md-3"></blog-sidebar>
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
  padding: 2rem 0 1rem;
  .mq-sm({ padding: 3.5rem 0 1rem; });
  .mq-lg({ padding: 4rem 0 1rem; });
  &__content {
    max-width: 1280px;
    margin: 0 auto;
    .mq-md({
      display: flex;
    });
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
    background-color: transparent;
    &:hover, &:focus {
      color: @white;
      border-color: @accent;
      background-color: @accent;
    }
  }
  &__marquee {
    font-style: italic;
    text-transform: uppercase;
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
