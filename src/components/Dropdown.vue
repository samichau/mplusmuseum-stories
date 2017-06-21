<template>
  <nav class="dropdown fs-m" @click="close">
    <router-link class="dropdown__item shadow"
      v-for="(item, i) of items"
      :key="i"
      :to="{ name: item.name, params: { page: item.params.page } }">
      <span class="lang-primary">{{ $t(item.content) }}</span>&thinsp;<span class="lang-secondary lang-secondary--same">{{ $tt(item.content) }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    prevent: {
      type: String,
      default: 'dropdown',
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyHandler);
    window.addEventListener('mousedown', this.clickHandler);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('mousedown', this.clickHandler);
  },
  methods: {
    keyHandler(e) {
      if (e.keyCode === 27) this.close();
    },
    clickHandler(e) {
      if (e.target.dataset.prevent !== this.prevent
      && e.target !== this.$el
      && !this.$el.contains(e.target)) {
        this.close();
      }
    },
    close() {
      this.$emit('update:active', false);
    },
  },
};
</script>

