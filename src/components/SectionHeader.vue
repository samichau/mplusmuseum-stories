<template>
  <div class="section-header" :class="theme ? `section-header--${theme}` : ''">

    <hr>

    <div class="section-header__content">

      <component :class="large !== false ? 'fs-m' : 'fs-b'"
      :is="tag"><span class="lang-primary" v-html="titleString"></span></component>

    </div>

    <hr>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Title',
    },
    tag: {
      default: 'h3',
    },
    large: {
      default: false,
    },
    theme: {
      default: false,
    },
  },
  computed: {
    titleString() {
      return (typeof this.title === 'object')
        ? this.$t(this.title)
        : this.title;
    },
  },
  components: {
  },
};
</script>


<style lang="less">
@import "../less/variables.less";

.section-header {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 1.5em;
  color: @black;
  margin: 0 0 1em;
  text-align: center;
  display: flex;
  align-items: center;
  &__content {
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    padding: 0 0.5em;
    letter-spacing: 0.025em;
    max-width: 90%;
  }
  hr {
    flex-grow: 1;
    margin: 0;
    background-color: @black;
    opacity: 0.3;
  }
  &--dark {
    color: @white;
    hr { background-color: @white; }
  }
  &--noline {
    hr {
      visibility: hidden;
    }
  }
}

</style>
