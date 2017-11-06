<template>
  <component :is="type" :link="link">

    <slot/>

  </component>
</template>

<script>
import AppLinkExternal from './AppLinkExternal.vue';
import AppLinkInternal from './AppLinkInternal.vue';

export default {
  props: {
    link: {
      required: true,
    },
  },
  computed: {
    type() {
      let type = 'app-link-';
      type += (typeof this.link === 'object')
        ? 'internal'
        : 'external';
      return type;
    },
  },
  components: {
    AppLinkExternal,
    AppLinkInternal,
  },
};
</script>
