const dynamicMixin = {
  methods: {
    createStringElement(el) {
      return el.str;
    },
    createElementFromFunction(el, h) {
      const functionName = `render${el.str}`;
      const functionToCall = this[functionName];
      if (typeof functionToCall === 'function') return functionToCall(h);
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
};

export default dynamicMixin;
