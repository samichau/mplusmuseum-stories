<template>
  <div class="content-blocks">
    <component v-for="(item, i) of items"
    :key="i"
    :is="item.type"
    :content="item.content"></component>  
  </div>
</template>

<script>
import Brightcove from './Brightcove.vue';
import Endnote from './Endnote.vue';
import ImageBlock from './ImageBlock.vue';
import Instagram from './Instagram.vue';
import NewsletterBlock from './NewsletterBlock.vue';
import TextBlock from './TextBlock.vue';
import Tweet from './Tweet.vue';
import Vimeo from './Vimeo.vue';
import Youtube from './YouTube.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    Brightcove,
    Endnote,
    ImageBlock,
    Instagram,
    NewsletterBlock,
    TextBlock,
    Tweet,
    Vimeo,
    Youtube,
  },
};
</script>
