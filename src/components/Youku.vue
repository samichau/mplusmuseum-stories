<template>
  <video-frame class="youku-block"
  :url="`http://player.youku.com/embed/${$t(content)}`"></video-frame>
</template>

<script>
import { videoFrameMixin } from '../util/mixins';

export default {
  mixins: [videoFrameMixin],
};
</script>
