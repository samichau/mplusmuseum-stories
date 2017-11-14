<template>
  <div class="item item--exhibition">

    <app-panel class="panel--mini shadow--small">

      <template slot="content">

        <div class="panel__inner">

          <app-section-label type="exhibition"/>

          <div>

            <app-link :link="item.link">

              <app-title class="item__title"
              wrap="span"
              :title="item.title"/>

            </app-link>

          </div>

          <tag-group class="fs-s"
          :tagIds="item.tags"/>

        </div>

          <a :href="item.link" target="_blank">

            <div class="item__media">

              <img class="lazy"
              :src="imgObj.loading"
              v-lazy="imgObj"
              :alt="$t(item.card.content.alt)">

            </div>

          </a>

      </template>

    </app-panel>

  </div>
</template>

<script>
import AppLink from './AppLink.vue';

export default {
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    imgObj() {
      const { content } = this.item.card;
      return {
        src: content.src,
        loading: this.$placeholder.generate(content.dim, 'loading', 'black', 'white'),
      };
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
