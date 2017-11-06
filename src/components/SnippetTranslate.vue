<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    snippet: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    parsers: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createStringElement(el) {
      return el.str;
    },
    createElementFromFunction(el, h) {
      const func = this.parsers[el.fn];
      if (typeof func === 'function') return func(this.data[el.fn], h, el.str);
      return false;
    },
    createElement(el, h) {
      if (el.type === 'str') {
        return this.createStringElement(el, h);
      } else if (el.type === 'fn') {
        return this.createElementFromFunction(el, h);
      }
      return false;
    },
  },
  render(h) {
    const snippet = this.$t(this.snippet);
    const elems = snippet.map(match => this.createElement(match, h));
    return h(this.tag, {}, elems);
  },
};
</script>
