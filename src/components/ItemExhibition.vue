<template>
  <div class="item item--exhibition">

    <app-panel class="panel--mini shadow--small">

      <template slot="content">

        <div class="panel__inner">

          <div>

            <app-link :link="item.link">

              <app-section-label type="exhibition"/>

              <app-title class="item__title"
              wrap="h4"
              :title="item.title"/>

            </app-link>

          </div>

          <tag-group class="fs-s"
          :tagIds="item.tags"/>

        </div>

        <app-link :link="item.link"
        role="presentation"
        aria-hidden="true">

          <div class="item__media"
          :style="image.wrapperStyle">

            <img class="lazy"
            :src="image.loading"
            v-lazy="image"
            :alt="$t(item.card.content.alt)">

          </div>

        </app-link>

      </template>

    </app-panel>

  </div>
</template>

<script>
import AppLink from './AppLink.vue';
import { itemMixin } from '../util/mixins';

export default {
  mixins: [itemMixin],
  props: {
    item: {
      required: true,
    },
  },
  components: {
    AppLink,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";


.item--exhibition {
  .item {
    &__title {
      margin-bottom: 0.25em;
    }
    &__media {
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
