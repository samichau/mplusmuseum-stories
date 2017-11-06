<template>
  <div class="section-label fs-s">
    <span v-html="text"></span>
    <template v-if="type === 'exhibition'">
      <img v-if="same !== false"
      class="external-icon"
      src="../assets/img/external.svg"
      alt="External Link">
      <img v-else
      class="external-icon"
      src="../assets/img/external-blue.svg"
      alt="External Link">
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
    },
    same: {
      default: false,
    },
  },
  computed: {
    text() {
      return this.$t(this.$store.state.translations.content[this.type]).one;
    },
  },
};
</script>
