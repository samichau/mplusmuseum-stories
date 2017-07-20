<template>
  <div class="text-block block" v-html="$t(content.html)"></div>
</template>

<script>
export default {
  props: {
    content: {
      required: true,
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.text-block {
  margin-bottom: 1em;

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1em;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 1em;
    padding: 0 0 0 1.5em;
    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    margin-top: 0;
  }

  blockquote {
    color: @grey;
    margin: 0 2em 1em 2em;
    padding: 0;
  }

  iframe {
    width: 100%;
    margin: 0 0 2em 0;
  }

  hr {
    height: 1px;
    border: none;
    background-color: @black;
    margin: 1em 0;
  }

  table {
    margin: 2em 0;
  }
  
  tr {
    &:nth-child(2n) {
      background: lighten(@lightgrey, 3%);
    }
  }

  th {
    font-weight: 400;
  }

  th, td {
    border: 1px solid darken(@lightgrey, 3%);
    padding: 0.5em 1em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
