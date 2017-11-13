<template>
  <video-frame class="youku-block"
  :class="modifierClass"
  :url="`http://player.youku.com/embed/${$t(content.media)}`"
  :alt="$t(content.alt)"
  :caption="$t(content.caption)"/>
</template>

<script>
import { blockMixin, videoFrameMixin } from '../util/mixins';

export default {
  mixins: [blockMixin, videoFrameMixin],
};
</script>
