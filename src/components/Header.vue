<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__bar shadow">
        <div class="header__section header__section--left">
          <router-link :to="{ name: 'home' }">
            <span class="sr-only">Go to M+ Homepage</span>
            <img src="../assets/img/mplusstories.svg" alt="M+ Stories Logo" @click="scrollToTop">
          </router-link>
        </div>
        <div class="header__section header__section--middle fs-b">
          <transition name="swoop" mode="out-in">
            <div v-if="notices.length" :key="noticeIndex" class="header__notices" v-html="$t(notices[noticeIndex].html)"></div>
          </transition>
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
        :items="menuItems"
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
  mounted() {
    this.startNotice();
  },
  destroyed() {
    this.stopNotice();
  },
  data() {
    return {
      dropdown: false,
      dropdownPrevent: 'dropdown',
      notice: false,
      noticeIndex: 0,
    };
  },
  computed: {
    ...mapState({
      lang: s => s.lang,
      query: s => s.route.query,
      menuItems: s => s.site.links.menu,
      notices: s => s.site.descriptors,
    }),
  },
  methods: {
    advanceNotice() {
      if (this.noticeIndex >= this.notices.length - 1) this.noticeIndex = 0;
      else this.noticeIndex += 1;
    },
    startNotice() {
      if (this.notices.length > 1) {
        this.notice = setInterval(this.advanceNotice, 30000);
      }
    },
    stopNotice() {
      clearInterval(this.notice);
    },
    scrollToTop() {
      if (this.$store.state.route.name === 'blog') window.scrollTo(0, 0);
    },
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
    }
  }
  &__notices {
    display: none;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
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
    display: block;
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
      display: block;
      margin-top: 0.5rem;
      padding: 0.3rem 1rem;
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
  &__bar {
    height: 4rem;
    .mq-sm({ height: 4.5rem; });
    .mq-lg({ height: 5rem; });
  }
  &__bar, &__section {
    padding: .4rem;
    .mq-sm({ padding: .45rem; });
    .mq-lg({ padding: .5rem; });
  }
  &__icon, &__section img {
    height: 2.4rem;
    .mq-sm({ height: 2.7rem; });
    .mq-lg({ height: 3rem; });
  }
  &__section {
    &--middle {
      padding: .4rem 1.2rem;
      .mq-sm({ padding: .45rem 1.35rem; });
      .mq-lg({ padding: .5rem 1.5rem; });
    }
  }
  &__icon {
    margin-left: .8rem;
    .mq-sm({ margin-left: .9rem; });
    .mq-lg({ margin-left: 1rem; });
  }
  &-push {
    height: 5rem;
    .mq-sm({ height: 5.5rem; });
    .mq-lg({ height: 6rem; });
  }
}

.drop-enter-active, .drop-leave-active {
  transition: all .5s ease;
}

.drop-enter, .drop-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

</style>
