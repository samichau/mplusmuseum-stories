<template>
  <video-frame class="youku-block"
  :url="`http://player.youku.com/embed/${$t(content.media)}`"
  :alt="$t(content.alt)"
  :caption="$t(content.caption)"></video-frame>
</template>

<script>
import { videoFrameMixin } from '../util/mixins';

export default {
  mixins: [videoFrameMixin],
};
</script>
