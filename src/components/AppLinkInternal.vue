<template>
  <router-link :to="link">

    <slot/>

  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      required: true,
    },
  },
};
</script>
