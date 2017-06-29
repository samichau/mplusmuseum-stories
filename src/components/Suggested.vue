<template>
  <div class="suggested">
    <marq class="suggested__marquee fs-m" :content="marqueeText"></marq>
    <div class="suggested__content">
      <router-link class="suggested__item"
      v-for="item of items"
      :key="item.name"
      :to="{ name: 'blog-post', params: { name: item.name } }">
        <div class="suggested__image">
          <img v-if="item.image[0]" :src="item.image[0].src" :alt="$t(item.image[0].alt)">
          <img class="suggested__placeholder" v-else src="../assets/img/logo-stories-stack.svg" alt="M+ Stories Logo">
        </div>
        <div class="suggested__title">
          <span class="lang-primary" v-html="$t(item.title)"></span>&thinsp;<span class="lang-secondary" v-html="$tt(item.title)"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Marq from './Marquee.vue';

export default {
  props: {
    items: {
      required: true,
      type: Array,
    },
  },
  computed: {
    marqueeText() {
      return this.$t(this.$store.state.site.translations.site.viewThis);
    },
  },
  components: {
    Marq,
  },
};
</script>


<style lang="less">
  @import '../less/variables.less';

  .suggested {
    &__marquee {
      padding: 0.25rem 0;
      background: @accent;
      color: @white;
      text-transform: uppercase;
      font-style: italic;
    }
    &__content {
      text-align: center;
      padding: 0.5rem;
      .mq-sm({
        padding: 1rem;
      });
    }
    &__item {
      display: inline-block;
      text-align: left;
      vertical-align: top;
      padding: 0.5rem;
      width: 100%/2;
      &:nth-of-type(3) {
        display: none;
      }
      .mq-sm({
        padding: 1rem;
        width: 100%/3;
        &:nth-of-type(3) {
          display: inline-block;
        }
      });
      &:hover {
        .suggested__title {
          color: @accent;
        }
      }
    }
    &__image {
      width: 100%;
      padding-top: 62.5%;
      height: 0;
      position: relative;
      background: darken(@lightgrey, 10%);
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        &.suggested__placeholder {
          width: 100%/4;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    &__title {
      margin: 0.25em 0;
      line-height: 1.2;
      color: @black;
    }
  }
  
</style>
