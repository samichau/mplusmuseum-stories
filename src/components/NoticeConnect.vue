<template>
  <div class="notice-connect">

    <transition name="swoop" mode="out-in">

      <div class="wrap wrap--wide"
      v-if="!connect"
      key="intro">

        <snippet-translate class="fs-m"
        tag="p"
        :snippet="translations.placeholderFull"
        :data="{ newsletter: false, social: false, }"
        :parsers="{ newsletter: parseNewsletter, social: parseSocial }"/>

      </div>

      <div class="wrap notice-connect__newsletter"
      v-else-if="connect === 'newsletter'"
      key="newsletter">

          <block-newsletter class="fs-m input-wrap--shadow"
          :label="$t(translations.placeholder)"
          name="newsletter__header"
          button="&rarr;"
          aria-label="Subscribe to the M+ Stories Newsletter"/>

          <div class="social-links fs-b">

            <button @click.prevent="connect = false">

              <img class="notice-connect__close" src="../assets/img/cross-blue.svg" alt="Close">

            </button>

          </div>

      </div>

      <div class="wrap"
      v-else-if="connect === 'social'"
      key="social">

        <div class="social-links fs-b">

          <a v-for="platform of $store.getters['site/socialLinkables']"
          :key="platform.id"
          :href="platform.link"
          target="_blank"
          v-html="platform.svg"></a>

          <button @click.prevent="connect = false">

            <img class="notice-connect__close" src="../assets/img/cross-blue.svg" alt="Close">

          </button>

        </div>

      </div>

    </transition>

  </div> 
</template>

<script>
import BlockNewsletter from '../components/BlockNewsletter.vue';
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  data() {
    return {
      connect: false,
    };
  },
  methods: {
    parseNewsletter(val, h, str) {
      return h('button', {
        class: 'notice-connect__text-btn',
        on: {
          click: (e) => {
            e.preventDefault();
            this.connect = 'newsletter';
          },
        },
      }, str);
    },
    parseSocial(val, h, str) {
      return h('button', {
        class: 'notice-connect__text-btn',
        on: {
          click: (e) => {
            e.preventDefault();
            this.connect = 'social';
          },
        },
      }, str);
    },
  },
  computed: {
    translations() {
      return this.$store.state.translations.newsletter;
    },
  },
  components: {
    BlockNewsletter,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.notice-connect {
  height: 4em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &__text-btn {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    color: @accent;
    &:hover, &:focus {
      text-decoration: underline;
    }
  }
  >div {
    width: 100%;
    margin: 0;
    flex-grow: 1;
  }
  &__newsletter {
    display: flex;
    align-items: center;
    form {
      flex-grow: 1;
    }
  }
  .notice-connect__close {
    height: 50%;
  }
  .social-links {
    .svg-icon {
      fill: @accent;
    }
  }
}
</style>
