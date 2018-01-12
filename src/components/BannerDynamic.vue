<template>
  <app-banner :content="content">

    <app-section-label :type="labelType(content)" same/>

    <app-title class="fs-l"
    wrap="h3"
    :title="content.title"/>

    <div v-if="content.type === 'episode'"
    class="banner__meta fs-b">

      <template v-if="content.series && content.series !== false">
        <img src="../assets/img/play.svg"
        :alt="$t(translations.accessibility.series)">&thinsp;<span v-html="$t(content.series.title)"></span>&ensp;
      </template>

      <img src="../assets/img/clock.svg"
      :alt="$t(translations.accessibility.duration)">&thinsp;<span v-html="$t(content.duration)"></span>

    </div>

    <div v-else-if="content.type === 'issue'"
    class="banner__meta fs-b">

      <snippet-translate
      :snippet="translations.journal.contributions"
      :data="{ contributors: content.contributors }"
      :parsers="{ contributors: (c) => $t(c) }"/>

    </div>

  </app-banner>
</template>

<script>
import SnippetTranslate from './SnippetTranslate.vue';
import { labelMixin } from '../util/mixins';

export default {
  mixins: [labelMixin],
  props: {
    content: {
      required: true,
    },
  },
  computed: {
    translations() {
      return this.$store.state.translations;
    },
  },
  components: {
    SnippetTranslate,
  },
};
</script>
