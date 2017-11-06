<template>
  <button class="clipboard fs-s shadow--inner" v-clipboard="url" @success="success" @error="error">

    <img class="clipboard__icon" v-if="icon" src="../assets/img/link-blue.svg" alt="Clipboard Icon">

    <input class="clipboard__text" :value="url" ref="input" readonly="true">

    <div class="clipboard__notice fs-b"
    :class="{ 'clipboard__notice--visible': notice }"
    v-html="active ? message : ''">

    </div>

  </button>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      notice: false,
      message: '',
    };
  },
  props: {
    url: {
      required: true,
    },
    icon: {
      default: true,
    },
  },
  methods: {
    showNotice(message) {
      if (this.active) return false;
      this.active = true;
      this.notice = true;
      this.message = message;
      setTimeout(() => this.hideNotice(), 1000);
      return true;
    },
    hideNotice() {
      this.notice = false;
      setTimeout(() => { this.active = false; }, 500);
    },
    success() {
      if (!this.notice) {
        this.$refs.input.select();
        this.showNotice(this.$t(this.$store.state.translations.site.clipboardCopied));
      }
    },
    error() {
      this.showNotice('Your browser doesn’t support copying!');
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

.clipboard {
  height: 5rem;
  border: none;
  width: 100%;
  padding: 0;
  margin: 0;
  color: @accent;
  white-space: nowrap;
  overflow: hidden;
  background: @white;
  display: flex;
  align-items: center;
  position: relative;
  &__icon, &__text {
    display: inline-block;
    vertical-align: middle;
  }
  &__icon {
    margin: 1rem 0 1rem 1rem;
    height: 3rem;
    width: 3rem;
  }
  &__text {
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    margin: 1rem;
    line-height: inherit;
    border: none;
  }
  &__notice {
    position: absolute;
    left: 0;
    top: 101%;
    width: 100%;
    height: 100%;
    background: @accent;
    z-index: 10;
    color: @white;
    transition: 0.5s ease top;
    padding: 1rem;
    line-height: 3rem;
    font-weight: @fontBold;
    &--visible {
      top: 0;
    }
  }
  &:after {
    content: '';
    position: absolute;
    right: 3px;
    top: 10%;
    height: 80%;
    width: 20%;
    background-color: transparent;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), @white 75%);
  }
}
</style>
