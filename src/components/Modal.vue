<template>
  <div class="modal" v-if="visible" @click="close">
    <div class="modal__content shadow fs-m">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
    };
  },
  methods: {
    show(message) {
      this.visible = true;
      this.message = message;
    },
    close() {
      this.visible = false;
      this.message = '';
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

@modalBackground: fade(@black, 50%);

.modal {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: @modalBackground;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    background: @white;
    padding: 1em;
  }
}
</style>
