<template>
  <nav class="dropdown fs-m" @click="close">

    <router-link class="dropdown__item shadow"
    v-for="(item, i) of items"
    v-if="validate(item.link)"
    :key="i"
    :to="$link(item.link)">

      <app-title class="app-title--same-size"
      :title="item.title"/>

    </router-link>

  </nav>
</template>

<script>
import _find from 'lodash/find';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    active: {
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
    validate({ name }) {
      if (_find(this.$router.options.routes, { name })) return true;
      return false;
    },
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

