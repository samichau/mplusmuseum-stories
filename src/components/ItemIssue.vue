<template>
  <div class="item item--issue">

    <app-panel class="panel--mini shadow--small">

      <div class="panel__inner" slot="content">

        <router-link :to="link">

          <app-section-label :type="labelType(item)"/>

          <app-title class="item__title"
          wrap="h4"
          :title="item.title"/>

        </router-link>

        <snippet-translate class="item__text"
        snippet="journal.contributions"
        :data="{ contributors: item.contributors }"
        :parsers="{ contributors: (c) => $t(c) }"/>

        <tag-group class="fs-s"
        :tagIds="item.tags"/>

      </div>

    </app-panel>

  </div>
</template>

<script>
import { labelMixin } from '../util/mixins';
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  mixins: [labelMixin],
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    link() {
      return {
        name: 'issue',
        params: {
          lang: this.$store.state.lang,
          issue: this.item.name,
        },
      };
    },
  },
  components: {
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.item--issue {
  .panel {
    border: 2px solid @accent;
    border-radius: 0.75em;
  }
  .item {
    &__inner {
      background: @white;
      border: 2px solid @accent;
      padding: 0.75em;
    }
    &__title {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }
}
</style>
