<template>
  <app-panel>

    <div class="panel__inner" slot="content">

      <div class="heading">
        <app-title-link class="fs-m"
        wrap="h2"
        :title="$store.state.translations.journal.imprint"/>
      </div>

      <block-text :content="content"/>

    </div>

  </app-panel>
</template>

<script>
export default {
  props: {
    content: {
      required: true,
    },
  },
};
</script>
