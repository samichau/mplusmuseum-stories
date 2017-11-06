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
          :button="`&rarr;<span class='sr-only'>${$t(translations.subscribe)}</span>`"/>

          <div class="social-links fs-b">

            <a href="#" @click.prevent="connect = false">

              <img class="notice-connect__close" src="../assets/img/cross-blue.svg" alt="Close">

            </a>

          </div>

      </div>

      <div class="wrap"
      v-else-if="connect === 'social'"
      key="social">


        <svg xmlns="http://www.w3.org/2000/svg" height="0" width="0" style="display: block;"><defs>
          <filter id="blueify">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0.1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"/>
          </filter>
        </defs></svg>

        <div class="social-links fs-b">

          <a v-for="platform of $store.getters['site/socialLinkables']"
          :key="platform.id"
          :href="platform.link"
          target="_blank">

            <img :src="platform.icon" :alt="$t(platform.title)" class="blueify">

          </a>

          <a href="#" @click.prevent="connect = false">

            <img class="notice-connect__close" src="../assets/img/cross-blue.svg" alt="Close">

          </a>

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
      return h('a', {
        domProps: {
          href: '#newsletter',
        },
        on: {
          click: (e) => {
            e.preventDefault();
            this.connect = 'newsletter';
          },
        },
      }, str);
    },
    parseSocial(val, h, str) {
      return h('a', {
        domProps: {
          href: '#social',
        },
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
.notice-connect {
  height: 4em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
    margin-top: 25%;
    height: 50%;
  }
}
</style>
