<template>
  <form class="newsletter-block input-wrap" @submit.prevent="action">
    <!-- @TODO Make functional -->
    <!-- <label v-if="!email.length" for="newsletter">{{ $t($store.state.site.translations.site.signUp) }} </label> -->
    <label v-if="!email.length" :for="name" v-html="label"></label>
    <input v-model="email" :name="name" type="text">
    <div class="button-wrap"><button v-html="button"></button></div>
  </form>
</template>

<script>
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
    action: {
      type: Function,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      email: '',
    };
  },
};
</script>

