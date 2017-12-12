<template>
  <div class="footnotes-block block" v-if="footnotes.length">

    {{ footnotes }}

    <ol class="fs-xs">

      <li class="footnotes__footnote"
      v-for="(footnote, i) in footnotes"
      :key="i">

        <a class="counter"
        :href="`#fnref-${footnote.id}`">

          <span class="anchor"
          :id="`fn-${footnote.id}`"></span>

        </a>

        <div v-html="footnote.html"></div>

      </li>

    </ol>

  </div>
</template>

<script>
export default {
  computed: {
    footnotes() {
      if (this.content.footnotes) {
        return this.content.footnotes;
      }
      if (this.$parent.$parent) {
        const { footnotes = [] } = this.$parent.$parent;
        return footnotes;
      }
      return [];
    },
  },
  props: {
    content: {
      required: true,
    },
  },
};
</script>


<style lang="less">
.footnotes-block {
  ol {
    margin: 0;
    padding: 0 0 0 1em;
    list-style-type: none;
    margin-left: 0;
  }
  li {
    padding-left: 0.5em;
    position: relative;
    counter-increment: footnotesblock;
    &:first-child {
      counter-reset: footnotesblock;
    }
    &:before {
      position: absolute;
      left: -1em;
      color: rgba(0, 50, 255, 0.9);
      content: counter(footnotesblock) " ";
    }
  }
  .counter {
    display: block;
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    left: -1em;
    cursor: pointer;
  }
}
</style>
