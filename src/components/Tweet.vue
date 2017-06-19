<script>
let addScriptPromise = null;

function addScript(src) {
  if (!addScriptPromise) {
    const s = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);
    addScriptPromise = new Promise((resolve) => {
      s.onload = resolve;
    });
  }
  return addScriptPromise;
}

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
  computed: {
    id() {
      return this.$t(this.content);
    },
  },
  mounted() {
    const scriptLoaded = !window.twttr
      ? addScript('//platform.twitter.com/widgets.js')
      : Promise.resolve();

    scriptLoaded.then(() => {
      window.twttr.widgets.createTweetEmbed(this.id, this.$el, this.options);
      this.isTweetLoaded = true;
    });
  },
  render(h) {
    return h('div', { class: 'tweet-embed block' }, this.isTweetLoaded ? undefined : this.$slots.default);
  },
};
</script>
