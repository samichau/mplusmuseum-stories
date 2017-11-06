<template>
  <div class="panel shadow">

    <div class="panel__header" v-if="$slots.header">

      <slot name="header"/>

    </div>

    <slot name="content"/>

  </div>
</template>

<style lang="less">
@import '../less/variables.less';

.panel {
  background: @white;
  margin-bottom: 1em;
  overflow: hidden;
  .mq-sm({
    margin-bottom: 1.5em;
  });
  &__header {
    position: relative;
  }
  &__inner {
    position: relative;
    padding: 1em;
    .mq-sm({
      padding: 1.5em;
    });
  }
  &--mini {
    .panel__inner {
      padding: 1em;
    }
  }
  &--dark {
    color: @white;
    background: @dark;
  }
  &--accent {
    color: @white;
    background: @accent;
  }
  &--dark-alt {
    color: @white;
    background: @lightDark;
    &.shadow {
      box-shadow: @shadowStyleDark;
    }
  }
  &--nopad {
    >.panel__inner {
      padding: 0;
    }
  }
}
</style>

