<template>
  <div>

    <slot/>

  </div>
</template>

<script>
  export default {
    props: {
      trigger: {
        type: Function,
        required: true,
      },
      payload: {
        default: false,
      },
    },
    data() {
      return {
        offsetTop: 0,
        windowHeight: 0,
      };
    },
    methods: {
      onScroll() {
        if (window.scrollY > this.offsetTop - this.windowHeight) {
          window.removeEventListener('scroll', this.onScroll);
          window.removeEventListener('resize', this.setParams);
          this.trigger(this.payload);
        }
      },
      setParams() {
        this.offsetTop = this.$el.offsetTop;
        this.windowHeight = document.documentElement.clientHeight;
      },
    },
    mounted() {
      if (typeof window !== 'undefined') {
        this.setParams();
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.setParams);
      }
    },
  };
</script>
