<template>
  <component class="blog-post__hero block--no-margin"
  v-if="post.media"
  :is="`block-${post.media.type}`"
  :content="post.media.content"
  :caption="false"/>
</template>

<script>
import BlockBrightcove from './BlockBrightcove.vue';
import BlockImage from './BlockImage.vue';
import BlockVimeo from './BlockVimeo.vue';
import BlockYouku from './BlockYouku.vue';
import BlockYoutube from './BlockYoutube.vue';
import SnippetByline from './SnippetByline.vue';

export default {
  props: {
    post: {
      required: true,
    },
  },
  components: {
    BlockBrightcove,
    BlockImage,
    BlockVimeo,
    BlockYouku,
    BlockYoutube,
    SnippetByline,
  },
};
</script>
