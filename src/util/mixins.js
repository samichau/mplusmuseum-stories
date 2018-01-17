import VideoFrame from '../components/VideoFrame.vue';

export const videoFrameMixin = {
  props: {
    content: {
      required: true,
    },
  },
  components: {
    VideoFrame,
  },
};

export const blockMixin = {
  computed: {
    modifierClass() {
      return this.content && this.content.modifier
        ? `block--${this.content.modifier}`
        : false;
    },
  },
};

export const titleMixin = {
  props: {
    title: {
      type: Object,
      required: true,
    },
    wrap: {
      default: 'span',
    },
    block: {
      default: false,
    },
  },
};

export const lightboxMixin = {
  created() {
    window.addEventListener('keydown', this.keyHandler);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyHandler);
  },
  methods: {
    keyHandler(e) {
      if (e.keyCode === 27) this.close();
    },
    close() {
      // empty
    },
  },
};

export const labelMixin = {
  methods: {
    labelType(item) {
      if (item.type === 'issue') {
        return {
          fn: this.issueWithNumber,
          data: {
            number: item.number,
          },
        };
      }
      return item.type;
    },
    issueWithNumber(data) {
      const snippet = this.$tl('journal.issueWithTitle');
      if (snippet) {
        return snippet.map((match) => {
          if (match.type === 'str') {
            return match.str;
          } else if (match.type === 'fn') {
            const prop = data[match.fn];
            if (prop) return prop;
          }
          return false;
        }).join('');
      }
      return this.$tl('content.issue').one;
    },
  },
};

export const itemMixin = {
  computed: {
    image() {
      const { content: { src, dim } } = this.item.card;
      const loading = this.$placeholder.generate(dim, 'loading', 'black', 'white');
      const padding = (dim.height / dim.width) * 100;
      const wrapperStyle = `padding-top: ${padding}%;'`;
      return { src, loading, wrapperStyle };
    },
  },
};
