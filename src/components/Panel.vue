<template>
  <div class="panel shadow">
    <div class="panel__header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="panel__inner" v-if="$slots.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less">
@import '../less/variables.less';

.panel {
  background: @white;
  margin-bottom: 2rem;
  overflow: hidden;
  .mq-sm({
    margin-bottom: 3rem;
  });
  &__inner {
    padding: 2rem;
    .mq-sm({
      padding: 3rem;
    });
  }
}
</style>

