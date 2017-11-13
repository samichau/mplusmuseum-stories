<template>
  <div class="infopanel infopanel--connect shadow">

    <div class="infopanel__section">

      <h6 class="infopanel__header" v-html="$t(translations.site.connect)"></h6>

      <div class="social-links fs-s">

        <a v-for="platform of socialPlatforms"
        :key="platform.id"
        :href="platform.link"
        target="_blank"
        v-html="platform.svg"></a>

      </div>

    </div>

    <hr>

    <div class="infopanel__section">

      <h6 class="infopanel__header" v-html="$t(translations.newsletter.placeholderAlt)"></h6>

      <block-newsletter class="input-wrap--inline"
      :label="$t(translations.newsletter.placeholder)"
      name="newsletter__header"
      button="&rarr;<span class='sr-only'>Subscribe to the M+ Stories Newsletter</span>"/>

    </div>

  </div>
</template>

<script>
import BlockNewsletter from './BlockNewsletter.vue';

export default {
  props: {
    active: {
      required: true,
    },
    prevent: {
      type: String,
      default: 'connect',
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
  computed: {
    translations() {
      return this.$store.state.translations;
    },
    socialPlatforms() {
      return this.$store.getters['site/socialLinkables'];
    },
  },
  components: {
    BlockNewsletter,
  },
};
</script>
