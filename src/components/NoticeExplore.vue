<template>
  <div class="notice-explore">

    <p class="fs-m" v-if="content" v-html="$t(content)"></p>

    <transition name="swoop" mode="out-in">

      <div class="notice-explore__tags fs-m" :key="indices.join('')">

        <div class="notice-explore__tag" v-for="index of indices" :key="index">

          <tag-single :tag="tagFromIndex(index)"/>

        </div>

      </div>

    </transition>

  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    content: {
      default: false,
    },
    count: {
      default: 3,
    },
  },
  data() {
    return {
      interval: false,
      indices: [],
    };
  },
  mounted() {
    this.increment();
    this.interval = setInterval(this.increment, 5000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    increment() {
      const indices = [];
      while (indices.length < this.count) {
        const randomnumber = _.random(0, this.tagsOrder.length - 1);
        const newIndex = indices.indexOf(randomnumber);
        const previousIndex = this.indices.indexOf(randomnumber);
        if (newIndex === -1 && previousIndex === -1) {
          indices[indices.length] = randomnumber;
        }
      }
      this.indices = indices;
    },
    tagFromIndex(index) {
      return this.tags[this.tagsOrder[index]];
    },
  },
  computed: {
    tags() {
      return this.$store.state.tags.entities;
    },
    tagsOrder() {
      return this.$store.state.tags.order;
    },
  },
};
</script>

<style lang="less">
.notice-explore {
  min-height: 4em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  &__tags {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
