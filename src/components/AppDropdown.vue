<template>
  <div class="app-dropdown">

    <button class="button app-dropdown__button"
    @click="toggle">
      <span v-html="text"></span>
      <img v-if="!selected" src='../assets/img/caret-down.svg'>
      <img v-else src='../assets/img/cross-blue.svg'
      @click.prevent.stop="clear">
    </button>

    <transition name="drop">

      <div class="app-dropdown__options shadow--small"
      v-if="active">

        <div class="app-dropdown__option">

          <button class="button"
          v-html="defaultButtonText"
          @click="clear"></button>

        </div>

        <div class="app-dropdown__option" v-for="(option, i) in options" :key="i">

          <button class="button"
          v-html="option.title"
          @click="select(option)"></button>

        </div>

      </div>

    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    defaultButtonText: {
      required: true,
    },
    selected: {
      required: true,
    },
  },
  computed: {
    text() {
      return this.selected
        ? this.selected.title
        : this.defaultButtonText;
    },
  },
  methods: {
    toggle() {
      if (this.active) this.close();
      else this.open();
    },
    open() {
      this.active = true;
      window.addEventListener('keydown', this.keyHandler);
      window.addEventListener('mousedown', this.clickHandler);
    },
    close() {
      this.active = false;
      window.removeEventListener('keydown', this.keyHandler);
      window.removeEventListener('mousedown', this.clickHandler);
    },
    clear() {
      this.$emit('update:selected', false);
      this.close();
      this.$emit('select', false);
    },
    select(option) {
      this.$emit('update:selected', option);
      this.close();
      this.$emit('select', option.value);
    },
    keyHandler(e) {
      if (e.keyCode === 27) this.close();
    },
    clickHandler(e) {
      if (e.target !== this.$el
      && !this.$el.contains(e.target)) {
        this.close();
      }
    },
  },
};
</script>


<style lang="less">
@import "../less/variables.less";

.app-dropdown {
  position: relative;
  button {
    white-space: nowrap;
    text-align: left;
    width: 12em;
    img {
      margin-left: 0.5em;
      display: inline-block;
      vertical-align: middle;
      height: 0.75em;
    }
  }
  &__button {
    position: relative;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
    }
    img {
      flex-shrink: 0;
    }
  }
  &__options {
    width: 100%;
    z-index: 10;
    position: absolute;
    max-height: 2.1875em * 4;
    overflow-y: scroll;
  }
  &__option {
    button {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
