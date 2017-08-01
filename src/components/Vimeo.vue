<template>
  <video-frame class="vimeo-block"
  :url="`https://player.vimeo.com/video/${$t(content.media)}`"
  :alt="$t(content.alt)"
  :caption="$t(content.caption)"></video-frame>
</template>

<script>
import { videoFrameMixin } from '../util/mixins';

export default {
  mixins: [videoFrameMixin],
};
</script>
