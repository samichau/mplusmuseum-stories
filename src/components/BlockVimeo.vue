<template>
  <video-frame class="vimeo-block"
  :class="modifierClass"
  :url="`https://player.vimeo.com/video/${$t(content.media)}`"
  :alt="$t(content.alt)"
  :caption="$t(content.caption)"/>
</template>

<script>
import { blockMixin, videoFrameMixin } from '../util/mixins';

export default {
  mixins: [blockMixin, videoFrameMixin],
};
</script>
