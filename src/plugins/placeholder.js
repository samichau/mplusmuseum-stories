class PlaceholderClass {
  constructor({ width, radius }) {
    this.width = width || 3000;
    this.radius = radius || 10;
  }

  generate(dimensions, type = 'loading', fill = '#ddd', color = '#aaa') {
    const aspect = dimensions.height / dimensions.width;
    const height = this.width * aspect;
    const obj = (type === 'error')
      ? this.error(height, color)
      : this.loading(height, color);
    return this.createEncodedString(height, obj, fill);
  }

  createEncodedString(height, obj, fill) {
    const str = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.width} ${height}'><rect width='${this.width}' height='${height}' y='0' x='0' fill='${fill}'/>${obj}</svg>`;
    const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`;
    return encoded;
  }

  error(height, color) {
    const lineWidth = this.radius * 2;

    const obj = `<line x1='${(this.width / 2)}' x2='${(this.width / 2)}' y1='${(height / 2) - (lineWidth * 3)}' y2='${(height / 2) + (lineWidth * 1)}' style='stroke:${color};stroke-width:${lineWidth}' /><line x1='${(this.width / 2)}' x2='${(this.width / 2)}' y1='${(height / 2) + (lineWidth * 2)}' y2='${(height / 2) + (lineWidth * 3)}' style='stroke:${color};stroke-width:${lineWidth}' /><circle r='${lineWidth * 5}' cy='${height / 2}' cx='${(this.width / 2)}' fill='transparent' style='stroke:${color};stroke-width:${lineWidth * 0.75}'/>`;

    return obj;
  }

  loading(height, color) {
    const obj = `<circle r='${this.radius}' cy='${height / 2}' cx='${(this.width / 2) - (this.radius * 3)}' fill='${color}'/>
    <circle r='${this.radius}' cy='${height / 2}' cx='${this.width / 2}' fill='${color}'/><circle r='${this.radius}' cy='${height / 2}' cx='${(this.width / 2) + (this.radius * 3)}' fill='${color}'/>`;

    return obj;
  }
}

// Returns a placeholder SVG with a matching apsect ratio
export default {
  install(Vue, options = {}) {
    const placeholder = new PlaceholderClass(options);
    Vue.prototype.$placeholder = placeholder;
  },
};
