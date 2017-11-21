<script>
import qrjs from 'qr.js';

export default {
  props: {
    size: {
      default: 100,
    },
    code: {
      required: true,
    },
    fill: {
      default: '#000000',
    },
  },
  render(h) {
    const items = [];
    const qrcode = qrjs(this.code);
    const columns = qrcode.modules;
    const cellWidth = this.size / columns.length;
    const cellHeight = this.size / columns.length;

    columns.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          const x = cellIndex * cellWidth;
          const y = rowIndex * cellHeight;
          const width = ((cellIndex + 1) * cellWidth) - x;
          const height = ((rowIndex + 1) * cellHeight) - y;

          items.push(h('rect', {
            attrs: {
              x,
              y,
              width,
              height,
            },
          }));
        }
      });
    });

    const group = h('g', {
      attrs: {
        fill: this.fill,
        'shape-rendering': 'crispEdges',
      },
    }, items);

    return h('svg', {
      attrs: {
        viewBox: `0 0 ${this.size} ${this.size}`,
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      },
    }, [group]);
  },
};
</script>
