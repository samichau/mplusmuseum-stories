<template>
  <video-frame class="youtube-block"
  :class="modifierClass"
  :url="`https://www.youtube.com/embed/${$t(content.media)}?autoplay=0&color=white&hl=${lang}`"
  :alt="$t(content.alt)"
  :caption="$t(content.caption)"/>
</template>

<script>
import { youTube } from '../locale';
import { blockMixin, videoFrameMixin } from '../util/mixins';

export default {
  mixins: [blockMixin, videoFrameMixin],
  computed: {
    lang() {
      return youTube[this.$store.state.lang];
    },
  },
};
</script>
