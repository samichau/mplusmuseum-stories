<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__bar shadow">
        <div class="header__section header__section--left">
          <router-link :to="{ name: 'home' }">
            <span class="sr-only">Go to M+ Homepage</span>
            <img src="../assets/img/logo-stories-stack.svg" alt="M+ Stories Logo">
          </router-link>
        </div>
        <div class="header__section header__section--middle fs-b">
          <div class="header__marquee">
            <span v-for="marquee of marquees">{{ $t(marquee.content) }}</span>
          </div>
        </div>
        <div class="header__section header__section--right header__icons">
          <button class="header__icon" @click="toggleDropdown">
            <span class="sr-only">Toggle Navigation Menu</span>
            <img v-show="!dropdown" src="../assets/img/menu.svg" alt="Open Menu" :data-prevent="dropdownPrevent">
            <img v-show="dropdown" src="../assets/img/cross.svg" alt="Close Menu" :data-prevent="dropdownPrevent">
          </button>
          <button class="header__icon" @click="changeLanguage">
            <img v-if="lang === 'en'" src="../assets/img/tc.svg" alt="Switch to Traditional Chinese">
            <img v-else src="../assets/img/en.svg" alt="Switch to English">
          </button>
        </div>
      </div>

      <dropdown v-if="dropdown"
        :items="nav"
        :active.sync="dropdown"
        :prevent="dropdownPrevent"></dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import locales from '../locale';
import Dropdown from './Dropdown.vue';

export default {
  data() {
    return {
      dropdown: false,
      dropdownPrevent: 'dropdown',
      share: false,
    };
  },
  computed: {
    ...mapState({
      lang: s => s.lang,
      query: s => s.route.query,
      nav: s => s.header.nav,
      marquees: s => s.header.marquee,
    }),
    navItems() {
      return this.dropdown ? this.nav : [];
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    changeLanguage() {
      const lang = (this.lang === locales[0]) ? locales[1] : locales[0];
      // Maintain query
      this.$router.push({ params: { lang }, query: this.query });
    },
  },
  components: {
    Dropdown,
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
  padding: 1rem;
  a {
    color: @white;
  }
  &__wrap {
    position: relative;
    width: 100%;
    color: @white;
  }
  &__bar {
    position: relative;
    z-index: 10;
    background: @accent;
    padding: 0.5rem;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__section {
    position: relative;
    padding: 0.5rem;
    &--left {
      flex-grow: 0;
      img {
        display: block;
        height: 3rem;
      }
    }
    &--middle {
      padding: 0.5rem 1.5rem;
      flex-grow: 1;
    }
    &--right {
      flex-grow: 0;
    }
  }
  &__marquee {
    display: none;
    .mq-sm({
      display: block;
    });
  }
  &__icons {
    display: flex;
  }
  &__icon {
    background: none;
    border: none;
    padding: 0;
    height: 3rem;
    display: block;
    margin-left: 1rem;
    img {
      height: 100%;
      display: block;
    }
  }
  .dropdown {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__item {
      margin-top: 0.5rem;
      padding: 0.3rem 1rem;
      background: @accent;
      transition: .25s ease opacity, .25s ease transform;
      // &.router-link-active {
      //   &:before {
      //     display: inline-block;
      //     vertical-align: middle;
      //     content: ' ';
      //     width: 0.5em;
      //     height: 0.5em;
      //     border-radius: 100%;
      //     background: @white;
      //   }
      // }
    }
  }
}

.header-push {
  height: 4rem;
  .mq-sm({
    height: 6rem;
  });
}

.drop-enter-active, .drop-leave-active {
  transition: all .5s ease;
}

.drop-enter, .drop-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

</style>
