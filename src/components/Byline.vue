<template>
  <div class="byline fs-b">
    <span>{{ $t(this.date) }}</span>
    {{ $t(t.site.by) }} 
    <router-link :to="{ query: { author: author.name } }">{{ $t(author.title) }}</router-link>. 
    <router-link v-if="category"
    :to="{ query: { category: category.name } }"
    tag="span">
      {{ $t(t.blog.filed) }}
      <a>{{ $t(category.title) }}</a>.
    </router-link>
  </div>
</template>

<script>

export default {
  props: {
    categoryId: {
      default: false,
      type: [Number, Boolean],
    },
    date: {
      type: Object,
    },
    authorId: {
      type: Number,
    },
  },
  computed: {
    t() {
      return this.$store.state.site.translations;
    },
    category() {
      return this.$store.state.blog.categories.find(category => category.id === this.categoryId);
    },
    author() {
      return this.$store.state.site.authors.find(author => author.id === this.authorId);
    },
  },
};
</script>

<style lang="less">
.byline {
  margin: 1rem 0;
  a {
    font-weight: 400;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
