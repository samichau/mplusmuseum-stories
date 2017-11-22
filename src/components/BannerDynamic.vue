<template>
  <app-banner :content="content">

    <app-section-label :type="labelType(content)" same/>

    <app-title class="fs-l"
    wrap="h3"
    :title="content.title"/>

    <div v-if="content.type === 'episode'"
    class="banner__meta fs-b">

      <template v-if="content.series && content.series !== false">
        <img src="../assets/img/play.svg" alt="Series">&thinsp;<span v-html="$t(content.series.title)"></span>&ensp;
      </template>

      <img src="../assets/img/clock.svg" alt="Duration">&thinsp;<span v-html="$t(content.duration)"></span>

    </div>

  </app-banner>
</template>

<script>
import { labelMixin } from '../util/mixins';

export default {
  mixins: [labelMixin],
  props: {
    content: {
      required: true,
    },
  },
};
</script>
