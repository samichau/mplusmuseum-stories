<template>
  <footer class="footer fs-s">
    <div class="footer__body footer__section">
      <a :href="`http://www.westkowloon.hk/${$store.state.lang}/`" target="_blank"><img src="../assets/img/wk-logo.svg" alt="West Kowloon Logo"></a>
      <router-link :to="{ name: 'page', params: { page: 'terms' } }">{{ terms }}</router-link>
    </div>
    <div class="footer__social footer__section social-links">
      <a v-for="platform of $store.getters['site/socialLinkables']"
        :href="platform.link"
        target="_blank">
        <img :src="platform.icon" :alt="$t(platform.title)">
      </a>
    </div>
  </footer>
</template>

<script>
import { routes as translations } from '../locale/translations';

export default {
  computed: {
    terms() {
      return this.$t(translations.terms);
    },
  },
};
</script>


<style lang="less">
@import "../less/variables.less";

.footer {
  background: @accent;
  color: @white;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .mq-sm({
    flex-direction: row;
  });
  a {
    display: block;
    color: inherit;
  }
  &__section {
    display: flex;
    align-items: center;
  }
  &__body {
    flex-direction: column;
    .mq-sm({
      flex-direction: row;
    });
    a {
      margin: 0 1rem;
    }
  }
  &__social {
    a {
      margin-left: 0;
      margin-right: 1rem;
    }
  }
}
</style>
