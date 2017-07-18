<template>
  <video-frame class="youtube-block"
  :url="`https://www.youtube.com/embed/${$t(content)}?autoplay=0&color=white&hl=${lang}`"></video-frame>
</template>

<script>
import { youTube } from '../locale';
import { videoFrameMixin } from '../util/mixins';

export default {
  mixins: [videoFrameMixin],
  computed: {
    lang() {
      return youTube[this.$store.state.lang];
    },
  },
};
</script>
