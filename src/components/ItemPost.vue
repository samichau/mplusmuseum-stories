<template>
  <div class="item item--post">

    <app-panel class="panel--mini shadow--small">

      <template slot="content">

        <router-link :to="link">

          <div class="item__media"
          :style="image.wrapperStyle">

            <img class="lazy"
            :src="image.loading"
            v-lazy="image"
            :alt="$t(item.card.content.alt)">

          </div>

        </router-link>

        <div class="panel__inner">

          <app-section-label type="post"/>

          <router-link :to="link">

            <app-title class="item__title"
            wrap="h3"
            :title="item.title"/>

          </router-link>

          <tag-group class="fs-s"
          :tagIds="item.tags"/>

        </div>

      </template>

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
        name: 'post',
        params: {
          lang: this.$store.state.lang,
          post: this.item.name,
        },
      };
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.item--post {
  .item {
    &__inner {
      background: @white;
      box-shadow: @shadowStyleSmall;
    }
    &__link {
      .item__inset {
        padding: 1em 1em 0;
      }
    }
    &__inset {
      padding: 0 1em 1em;
    }
  }
}
</style>
