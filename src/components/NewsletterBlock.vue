<template>
  <form class="newsletter-block input-wrap" @submit.prevent="submit" enctype="multipart/form-data">
    <input type="hidden" name="CID" value="274418198">
    <input type="hidden" name="SID" value="">
    <input type="hidden" name="f" value="8604">
    <input type="hidden" name="p" value="2">
    <input type="hidden" name="a" value="r">
    <input type="hidden" name="el" value="">
    <input type="hidden" name="endlink" value="">
    <input type="hidden" name="llid" value="">
    <input type="hidden" name="c" value="">
    <input type="hidden" name="counted" value="">
    <input type="hidden" name="inp_30577" size="1" value="1">
    <input type="hidden" name="inp_14051" :value="lang">

    <label v-if="!email.length" for="inp_3" v-html="label"></label>
    <input v-model="email" name="inp_3" type="text">
    <div class="button-wrap"><button v-html="button"></button></div>

  </form>
</template>

<script>
import axios from 'axios';
import { validateEmail } from '../util/validation';

export default {
  props: {
    label: {
      required: true,
    },
    name: {
      required: true,
    },
    button: {
      default: 'Submit',
    },
  },
  data() {
    return {
      email: '',
    };
  },
  computed: {
    t() {
      return this.$store.state.site.translations.newsletter;
    },
    lang() {
      return this.$store.state.lang === 'tc' ? 2 : 1;
    },
  },
  methods: {
    submit() {
      if (!validateEmail(this.email)) {
        this.error();
        return false;
      }
      // @TODO Make sure this works
      /* eslint-disable no-undef */
      const formData = new FormData(this.$el);
      return axios.post('http://stories.dev/', formData).then(() => {
        this.success();
        return true;
      }).catch(() => {
        this.error('There was a network problem. Please try again later');
        return false;
      });
    },
    error(message) {
      this.$modal.show(message || this.$t(this.t.errorInvalid), this.$t(this.t.errorTitle));
    },
    success() {
      this.$modal.show(this.$t(this.t.successMessage), this.$t(this.t.successTitle));
    },
  },
};
</script>

