<template>
  <div class="footnotes">

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
  props: {
    footnotes: {
      required: true,
    },
  },
};
</script>


<style lang="less">
.footnotes {
  margin-top: 2em;
  margin-bottom: 0;
  ol {
    margin: 0;
    padding: 0 0 0 1em;
    list-style-type: none;
    margin-left: 0;
  }
  li {
    padding-left: 0.5em;
    position: relative;
    counter-increment: customlistcounter;
    &:first-child {
      counter-reset: customlistcounter;
    }
    &:before {
      position: absolute;
      left: -1em;
      color: rgba(0, 50, 255, 0.9);
      content: counter(customlistcounter) " ";
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
