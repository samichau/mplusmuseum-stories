<script>
import addScript from '../util/promise-script';

export default {
  data() {
    return {
      isTweetLoaded: false,
    };
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const scriptLoaded = !window.twttr
      ? addScript('//platform.twitter.com/widgets.js')
      : Promise.resolve();

    scriptLoaded.then(() => {
      window.twttr.widgets.createTweetEmbed(this.$t(this.content), this.$el, this.options);
      this.isTweetLoaded = true;
    });
  },
  render(h) {
    return h('div', { class: 'tweet-block block' }, this.isTweetLoaded ? undefined : this.$slots.default);
  },
};
</script>

<style lang="less">
.tweet-block {
  .twitter-tweet {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
