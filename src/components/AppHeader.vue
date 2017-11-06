<template>
  <header class="header">

    <div class="header__wrap">

      <div class="header__bar shadow">

        <div class="header__section header__section--left">

          <router-link :to="{ name: 'home' }">

            <span class="sr-only">Go to M+ Homepage</span>

            <img class="hide--desktop" src="../assets/img/stories-logo-stack.svg" alt="M+ Stories Logo" @click="scrollToTop">
            <img class="hide--mobile" src="../assets/img/stories-logo-line.svg" alt="M+ Stories Logo" @click="scrollToTop">

          </router-link>

        </div>

        <div class="header__section header__section--middle fs-b">

          <transition name="swoop" mode="out-in">

            <div v-if="notice"
            :key="notice.id"
            class="header__notice hide--mobile"
            :class="{ 'header__notice--title' : notice.isTitle }">
              <button @click="noticeClick(notice)" v-html="notice.value"></button>
              <component :is="notice.link ? 'router-link' : 'div'"
              :to="notice.link ? $link({ name: notice.link, params: {} }) : null"
              v-html="notice.value"/>
            </div>

          </transition>

        </div>

        <div class="header__section header__section--right header__icons">

          <button class="header__icon" @click="toggleDropdown">

            <span class="sr-only">Toggle Navigation Menu</span>

            <img v-show="panel !== 'dropdown'" src="../assets/img/menu.svg" alt="Open Menu"
            :data-prevent="prevent.dropdown">

            <img v-show="panel === 'dropdown'" src="../assets/img/cross.svg" alt="Close Menu"
            :data-prevent="prevent.dropdown">

          </button>

          <button class="header__icon" @click="changeLanguage">

            <img v-if="lang === 'en'" src="../assets/img/tc.svg" alt="Switch to Traditional Chinese">

            <img v-else src="../assets/img/en.svg" alt="Switch to English">

          </button>

          <button class="header__icon" @click="toggleConnect">

            <span class="sr-only">Explore the Website</span>

            <img v-show="panel !== 'connect'" src="../assets/img/connect-wave.svg" alt="Connect"
            :data-prevent="prevent.connect">

            <img v-show="panel === 'connect'" src="../assets/img/cross.svg" alt="Close Connect"
            :data-prevent="prevent.connect">

          </button>

          <button class="header__icon"
          v-if="searchEnabled"
          @click="toggleSearch">

            <span class="sr-only">Search the Website</span>

            <img v-show="panel !== 'search'" src="../assets/img/search.svg" alt="Open Search"
            :data-prevent="prevent.search">

            <img v-show="panel === 'search'" src="../assets/img/cross.svg" alt="Close Search"
            :data-prevent="prevent.search">

          </button>

        </div>

      </div>

      <transition name="drop">

        <app-header-dropdown v-if="panel === 'dropdown'"
        key="dropdown"
        :items="menuItems"
        :active.sync="panel"
        :prevent="prevent.dropdown"/>

        <app-header-connect v-if="panel === 'connect'"
        key="contentPanel"
        :active.sync="panel"
        :prevent="prevent.connect"/>

        <app-header-search v-if="panel === 'search'"
        key="search"
        :active.sync="panel"
        :prevent="prevent.search"/>

      </transition>

    </div>

  </header>
</template>

<script>
import { mapState } from 'vuex';
import _find from 'lodash/find';
import locales from '../locale';
import AppHeaderConnect from './AppHeaderConnect.vue';
import AppHeaderDropdown from './AppHeaderDropdown.vue';
import AppHeaderSearch from './AppHeaderSearch.vue';
import BlockNewsletter from './BlockNewsletter.vue';

export default {
  data() {
    return {
      panel: false,
      prevent: {
        connect: 'connect',
        dropdown: 'dropdown',
        search: 'search',
      },
    };
  },
  computed: {
    ...mapState({
      lang: s => s.lang,
      translations: s => s.translations,
      routeQuery: s => s.route.query,
      menuItems: s => s.site.links.menu,
      notice: s => s.header.notice,
    }),
    searchEnabled() {
      return _find(this.$router.options.routes, { name: 'search' });
    },
  },
  methods: {
    noticeClick({ scroll = 0 }) {
      window.scrollTo(0, scroll);
    },
    scrollToTop() {
      if (this.$store.state.route.name === 'home') window.scrollTo(0, 0);
    },
    changeLanguage() {
      const lang = (this.lang === locales[0]) ? locales[1] : locales[0];
      // Maintain query
      this.$router.push({ params: { lang }, query: this.routeQuery });
    },
    toggleConnect() {
      this.panel = (this.panel === 'connect')
        ? false
        : 'connect';
    },
    toggleDropdown() {
      this.panel = (this.panel === 'dropdown')
        ? false
        : 'dropdown';
    },
    toggleSearch() {
      this.panel = (this.panel === 'search' || this.$store.state.route.name === 'search')
        ? false
        : 'search';
    },
  },
  components: {
    AppHeaderConnect,
    AppHeaderDropdown,
    AppHeaderSearch,
    BlockNewsletter,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.header {
  position: fixed;
  z-index: 101;
  width: 100%;
  top: 0;
  left: 0;
  a {
    color: @white;
  }
  &__wrap {
    position: relative;
    z-index: 20;
    width: 100%;
    color: @white;
  }
  &__bar {
    position: relative;
    z-index: 10;
    background: @accent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__section {
    position: relative;
    &--left {
      flex-grow: 0;
      flex-shrink: 0;
      img {
        display: block;
      }
    }
    &--middle {
      flex-grow: 1;
      overflow: hidden;
    }
    &--right {
      flex-grow: 0;
      flex-shrink: 0;
      justify-content: flex-end;
    }
  }
  &__query {
    color: @white;
    height: 100%;
    position: relative;
    .query-input {
      position: relative;
      z-index: 5;
      border: none;
      margin: 0;
      width: 100%;
      height: 100%;
      background: none;
      display: block;
      padding: 0 0.5em;
    }
    .query-placeholder {
      position: absolute;
      z-index: -1;
      pointer-events: none;
      top: 0;
      left: 0;
      line-height: 2em;
      padding: 0 0.5em;
      height: 100%;
    }
  }
  &__notice {
    font-weight: @fontBold;
    text-align: right;
    line-height: 2em;
    display: block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    border: none;
    background: none;
    button {
      background: none;
      border: none;
      margin: 0;
      padding: 0;
    }
    span {
      font-weight: @fontNormal;
    }
  }
  &__icons {
    display: flex;
  }
  &__icon {
    background: none;
    border: none;
    padding: 0;
    display: block;
    img {
      height: 100%;
      display: block;
    }
    transition: .15s ease transform;
    &:hover, &:focus {
      transform: scale(1.1);
    }
  }
  .dropdown {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__item {
      display: block;
      margin-top: 0.2em;
      padding: 0.1em 0.4em;
      background: @accent;
      transition: .125s ease border-color;
      border-bottom: 3px solid transparent;
      &.router-link-active, &:hover {
        border-color: @white;
      }
    }
  }
}

// Sizing rules
.header {
  padding: @hSm * 1;
  .mq-sm({ padding: @hMd * 1; });
  .mq-lg({ padding: @hLg * 1; });
  &__bar {
    height: @hSm * 10;
    .mq-sm({ height: @hMd * 10; });
    .mq-lg({ height: @hLg * 10; });
  }
  &__bar, &__section {
    padding: @hSm;
    .mq-sm({ padding: @hMd; });
    .mq-lg({ padding: @hLg; });
  }
  &__icon, &__section img {
    height: @hSm * 6;
    .mq-sm({ height: @hMd * 6; });
    .mq-lg({ height: @hLg * 6; });
  }
  &__section {
    &--middle {
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0.75em;
      padding-left: 0.75em;
      height: 100%;
    }
  }
  &__icon {
    margin-left: @hSm * 3;
    .mq-sm({ margin-left: @hMd * 3; });
    .mq-lg({ margin-left: @hLg * 3; });
    &:first-child {
      margin-left: 0;
    }
  }
  &-push {
    height: @hSm * 11;
    .mq-sm({ height: @hMd * 11; });
    .mq-lg({ height: @hLg * 11; });
  }
}

.infopanel {
  position: absolute;
  right: 0;
  color: @black;
  background: fade(@lightgrey, 95%);
  width: 100%;
  max-width: 100% / 5;
  max-width: 24em;
  margin-left: auto;
  padding: 0.5em;
  &__header {
    margin-bottom: 0.5em;
  }
  &__section {
    padding: 0.5em;
  }
  hr {
    background: @black;
  }
  .social-links a {
    margin-left: 0;
    margin-right: 0.5em;
  }
  &--search {
    max-width: 100%;
    input, label {
      text-align: center;
    }
  }
}

</style>
