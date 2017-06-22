<template>
<div id="app" class="fs-b">
  <site-header></site-header>
  <router-view class="view" :key="key"></router-view>
  <site-footer></site-footer>
  <transition name="fade" mode="out-in">
    <lightbox v-if="$store.state.lightbox.active"></lightbox>
  </transition>
</div>
</template>

<script>
import _includes from 'lodash/includes';
import locales from './locale';
import SiteHeader from './components/Header.vue';
import SiteFooter from './components/Footer.vue';
import Lightbox from './components/Lightbox.vue';

export default {
  created() {
    let primary = this.$route.params.lang;
    let secondary = locales[1];
    if (!_includes(locales, primary)) primary = locales[0];
    if (primary === locales[1]) {
      secondary = locales[0];
    } else {
      primary = locales[0];
    }
    this.$store.commit('setLanguage', { primary, secondary });
  },
  computed: {
    key() {
      const route = this.$store.state.route;
      return route.params.name ? route.name + route.params.name : route.name;
    },
  },
  components: {
    SiteHeader,
    SiteFooter,
    Lightbox,
  },
};
</script>

<style lang="less">
@import "./less/normalize.less";
@import "./less/typography.less";
@import "./less/columns.less";
@import "./less/variables.less";

html {
  font-size: 10px;
  font-weight: 300;
  color: @black;
  font-family: "AgipoWeb", Helvetica, Arial, "PingFang HK", "蘋方-港", "HanHei TC", "Heiti TC", "STHeiti", "Microsoft JhengHei UI", "Microsoft JhengHei", "微软雅黑", STXihei, "华文细黑", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1, "dlig" 1, "ss01" 1;
}

body {
  &.modal-active {
    overflow: hidden;
  }
}

#app {
  min-height: 100vh;
}

.view {
  min-height: 100vh;
}

.wrap {
  max-width: 800px;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.block {
  margin-top: 2em;
  margin-bottom: 2em;
  &:first-child {
    margin-top: 0;
  }
}

.blur {
  .view {
    filter: blur(20px);
  }
}

strong {
  font-weight: 400;
}

a {
  color: @accent;
  text-decoration: none;
}

.lang-primary {
  font-weight: 400;
}

.lang-secondary {
  font-weight: 300;
  font-size: 70%;
  &--same {
    font-size: 100%;
  }
}

.view {
  margin: 0 auto;
  position: relative;
}

.anchor {
  top: -10rem;
  position: relative;
  visibility: hidden;
}

.button {
  cursor: pointer;
  text-align: center;
  min-width: 5rem;
  background-color: @white;
  color: @accent;
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 400;
  .shadow--small;
  &:hover, &:focus {
    background: @lightgrey;
    color: @accent;
  }
  &--accent {
    background-color: @accent;
    color: @white;
  }
  &--inactive {
    color: @grey;
    &:hover, &:focus {
      background: @white;
      color: @grey;
    }
  }
  &--active {
    background: @accent;
    color: @white;
    &:hover, &:focus {
      background: @accent;
      color: @white;
    }
  }
  &--flat {
    background: none;
    box-shadow: none;
  }
}

.input-wrap {
  position: relative;
  label, input {
    width: 100%;
  }
  label {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    opacity: 0.5;
  }
  input {
    position: relative;
    z-index: 2;
    border: none;
    background: none;
  }
  .button-wrap {
    z-index: 2;
  }
  &--inline {
    input {
      border-top: none;
      border-right: none;
      border-bottom: 1px solid @accent;
      border-left: none;
      padding: 0 0 0.25em;
    }
    .button-wrap {
      position: absolute;
      right: 0;
      top: 0;
    }
    button {
      position: absolute;
      right: 0;
      height: 100%;
      padding: 0.125em 0;
      border: none;
      background: none;
      color: @accent;
    }
  }
}

.social-links {
  a {
    display: inline-block;
    vertical-align: top;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: 2em;
    height: 2em;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

/* GLOBALS */

.shadow {
  box-shadow: @shadowStyle;
  &--inner {
    box-shadow: @shadowStyleInner;
  }
}

.shadow--small {
  box-shadow: @shadowStyleSmall;
}

/* TRANSITIONS */

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.swoop-enter-active, .swoop-leave-active {
  transition: all .2s ease;
}

.swoop-enter, .swoop-leave-to {
  transform: translateY(100%);
}

/* ACCESSIBILITY */

.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
}

</style>
