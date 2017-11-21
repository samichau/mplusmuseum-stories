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
    document.body.classList.add('modal-active');
    window.addEventListener('keydown', this.keyHandler);
  },
  destroyed() {
    document.body.classList.remove('modal-active');
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
