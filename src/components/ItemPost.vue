<template>
  <div class="item item--post">

    <app-panel class="panel--mini shadow--small">

      <template slot="content">

        <router-link :to="link">

          <div class="item__media">

            <img class="lazy"
            :src="imgObj.loading"
            v-lazy="imgObj"
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

export default {
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
    imgObj() {
      const { content } = this.item.card;
      return {
        src: content.src,
        loading: this.$placeholder.generate(content.dim, 'loading', 'black', 'white'),
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
