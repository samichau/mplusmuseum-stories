<template>
  <video-frame class="vimeo-block"
  :url="`https://player.vimeo.com/video/${$t(content)}`"></video-frame>
</template>

<script>
import { videoFrameMixin } from '../util/mixins';

export default {
  mixins: [videoFrameMixin],
};
</script>
