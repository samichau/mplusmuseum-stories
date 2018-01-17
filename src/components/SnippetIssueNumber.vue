<template>
  <snippet-translate tag="span"
  snippet="journal.issue"
  :data="{ number }"
  :parsers="{ number: (n) => n }"/>
</template>

<script>
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  props: {
    number: {
      required: true,
    },
  },
  components: {
    SnippetTranslate,
  },
};
</script>
