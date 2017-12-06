<template>
  <div class="item item--article">

    <app-panel class="panel--mini shadow--small">

      <div slot="content" class="panel__inner">

        <router-link :to="link">

          <app-section-label type="article"/>

          <app-title class="item__title"
          wrap="div"
          :title="item.title"/>

        </router-link>

        <div class="item__text fs-b">
          <span v-html="`${$t(item.excerpt)}`"/>&thinsp;
          <router-link :to="link">[...]</router-link>
        </div>

        <router-link class="item__media"
        v-if="item.card"
        :to="link"
        :style="image.wrapperStyle">

          <img class="lazy"
          :src="image.loading"
          v-lazy="image"
          :alt="$t(item.card.content.alt)">

        </router-link>

        <tag-group class="fs-s" :tagIds="item.tags"/>

      </div>

    </app-panel>

  </div>
</template>

<script>
import { itemMixin } from '../util/mixins';

export default {
  mixins: [itemMixin],
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    link() {
      return {
        name: 'article',
        params: {
          lang: this.$store.state.lang,
          issue: this.item.issue.name,
          article: this.item.name,
        },
      };
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.item--article {
  .item {
    &__title {
      margin-bottom: 0.25em;
    }
    &__text {
      a {
        font-weight: @fontBold;
        color: @accent;
      }
    }
    &__media {
      display: block;
      margin-top: 0.5em;
    }
  }
}
</style>
