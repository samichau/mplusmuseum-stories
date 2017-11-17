<template>
  <lazy-component @show="onLazyload" class="suggested">

    <transition name="fade" mode="out-in">

      <app-marquee class="suggested__marquee fs-m"
      v-if="items.length"
      :content="marqueeText"/>

    </transition>

    <transition name="swoop-up" mode="out-in">

      <div class="suggested__content wrap wrap--wide"
      v-if="items.length">

        <app-link class="suggested__item"
        v-for="item of items"
        :key="item.id"
        :link="$link(item.link)">

          <div class="suggested__image">

            <img v-if="item.card && item.card.type === 'image'"
            :src="item.card.content.src"
            :alt="$t(item.card.content.alt)">

            <img v-else
            class="suggested__placeholder"
            src="../assets/img/stories-logo-stack.svg"
            alt="M+ Stories Logo">

          </div>

          <app-section-label :type="item.type"/>

          <app-title class="suggested__title"
          wrap="div"
          :title="item.title"/>

        </app-link>

      </div>

    </transition>

  </lazy-component>
</template>

<script>
import { asyncGet } from '../api';
import AppLink from './AppLink.vue';
import AppMarquee from './AppMarquee.vue';

export default {
  data() {
    return {
      items: [],
    };
  },
  props: {
    id: {
      required: true,
      type: Number,
    },
    omit: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  computed: {
    marqueeText() {
      return this.$t(this.$store.state.translations.site.viewThis);
    },
  },
  methods: {
    componentType(item) {
      let type = 'app-link-';
      type += (typeof item.link === 'object')
        ? 'internal'
        : 'external';
      return type;
    },
    onLazyload() {
      asyncGet('data/related/', {
        id: this.id,
        omit: this.omit,
      }).then(({ data: { items } }) => {
        this.items = items;
        this.$triggerNative();
      }).catch(() => {
        // Fail silently
      });
    },
  },
  components: {
    AppLink,
    AppMarquee,
  },
};
</script>


<style lang="less">
  @import '../less/variables.less';

  .suggested {
    overflow: hidden;
    &__marquee {
      position: relative;
      z-index: 5;
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
      color: inherit;
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
      &:hover, &:focus {
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
      margin-bottom: 0.5em;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        font-family: 'object-fit: cover;';
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
      line-height: 1.2;
    }
  }
  
</style>
