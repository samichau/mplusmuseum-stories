<template>
  <component :is="wrap" class="app-title" :class="{ 'app-title--block': block  }">

    <span class="lang-primary"
    v-html="$t(title)"/>

    <template v-if="!block">&thinsp; </template>

    <router-link :to="{ params: { lang: $store.state.langSecondary } }"
    class="lang-secondary"
    v-html="$tt(title)"
    aria-hidden="true"/>

  </component>
</template>

<script>
import { titleMixin } from '../util/mixins';

export default {
  mixins: [titleMixin],
};
</script>
