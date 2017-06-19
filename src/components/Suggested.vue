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
      padding: 0.5rem;
      .mq-sm({
        padding: 1rem;
      });
      display: flex;
    }
    &__item {
      margin: 0.5rem;
      width: 100%/2;
      &:nth-of-type(3) {
        display: none;
      }
      .mq-sm({
        margin: 1rem;
        width: 100%/2;
        &:nth-of-type(3) {
          display: block;
        }
      });
      &:hover {
        .suggested__title {
          color: @accent;
        }
      }
    }
    &__image {
      padding-top: 62.5%;
      height: 0;
      position: relative;
      background: @white;
      img {
        position: absolute;
        top: 0;
      }
    }
    &__title {
      margin: 0.25em 0;
      line-height: 1.2;
      color: @black;
    }
  }
  
</style>
