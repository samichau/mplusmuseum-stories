<template>
  <transition name="fade" mode="out-in">
    <div class="modal" v-if="visible" @click="close">
      <div class="modal__content shadow">
        <h2 class="modal__title fs-m">{{ title }}</h2>
        <div class="modal__message fs-b">{{ message }}</div>
        <button v-for="btn of buttons" class="modal__button button button--flat button--accent fs-s">{{ btn }}</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: '',
      message: '',
      buttons: [],
    };
  },
  methods: {
    show(message, title = 'Message', buttons = ['Close']) {
      this.title = title;
      this.message = message;
      this.buttons = (!Array.isArray(buttons)) ? [buttons] : buttons;
      this.open();
    },
    error(error) {
      this.title = 'Error';
      this.message = error.status
        ? `${error.status}: ${error.data.errors[0]}`
        : error.data.errors[0];
      this.buttons = ['Close'];
      this.open();
    },
    open() {
      window.addEventListener('keydown', this.keyHandler);
      this.visible = true;
    },
    close() {
      window.removeEventListener('keydown', this.keyHandler);
      this.visible = false;
      this.title = 'Message';
      this.message = '';
    },
    keyHandler(e) {
      if (e.keyCode === 27) this.close();
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

@modalBackground: fade(@black, 60%);

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
  padding: 1.5rem;
  &__content {
    text-align: right;
    background: @accent;
    color: @white;
    padding: 2rem;
    min-width: 240px;
    max-width: 640px;
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__title, &__message {
    text-align: left;
  }
  &__button {
    text-transform: uppercase;
    &.button {
      margin-top: 4rem;
      margin-left: auto;
      padding: 0.5em;
    }
  }
}
</style>
