<template>
  <div class="item item--post">

    <app-panel class="panel--mini shadow--small">

      <template slot="content">

        <router-link :to="link">

          <div class="item__media">

            <img class="lazy"
            :src="$placeholder.generate(item.card.content.dim, 'loading', 'black', 'white')"
            v-lazy="{
              src: item.card.content.src,
              loading: $placeholder.generate(item.card.content.dim, 'loading', 'black', 'white'),
            }"
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
