<template>
  <div class="grid"
  :class="{ 'grid--loaded': initialized }">
   
    <div class="grid__sizer"
    :style="sizerStyle"
    ref="sizer"></div>

    <div class="grid__column"
    v-for="(column, columnIndex) of columns"
    :key="`${columnIndex}-${column.count}`"
    :ref="`col-${columnIndex}`">

      <component v-for="item in column"
      :is="`item-${item.type}`"
      :item="item"
      :key="item.id"
      :ref="item.id"/>
    
    </div>

  </div>
</template>

<script>
import _clone from 'lodash/clone';
import ItemArticle from './ItemArticle.vue';
import ItemEpisode from './ItemEpisode.vue';
import ItemExhibition from './ItemExhibition.vue';
import ItemIssue from './ItemIssue.vue';
import ItemPost from './ItemPost.vue';

export default {
  components: {
    ItemArticle,
    ItemEpisode,
    ItemExhibition,
    ItemIssue,
    ItemPost,
  },
  props: {
    content: {
      required: true,
    },
  },
  data() {
    return {
      building: false,
      calculating: false,
      columnCount: 0,
      columns: [],
      initialized: false,
      items: [],
      queue: [],
    };
  },
  computed: {
    sizerStyle() {
      return this.calculating ? {
        display: 'block',
        visibility: 'hidden !important',
        top: '-1000px !important',
      } : null;
    },
  },
  mounted() {
    this.build();
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    content() {
      const currentCount = this.items.length;
      const newCount = this.content.length;
      const itemsToAdd = this.content.slice(currentCount, newCount);
      this.appendItems(itemsToAdd);
    },
  },
  methods: {
    onResize() {
      this.build();
    },
    build() {
      if (this.building) return false;
      this.building = true;
      const currentColumnCount = this.columnCount;
      return this.setColumnCount().then(() => {
        if (this.columnCount !== currentColumnCount) {
          this.resetColumns();
          this.appendItems(this.content);
        }
        this.building = false;
      });
    },
    setColumnCount() {
      this.calculating = true;
      return this.$nextTick().then(() => {
        const containerWidth = this.$el.offsetWidth;
        const columnWidth = this.getSizerWidth();
        this.columnCount = (columnWidth === 0)
          ? 1
          : Math.round(containerWidth / columnWidth);
        this.calculating = false;
      });
    },
    appendItems(items) {
      this.queue = _clone(items);
      this.$nextTick(this.processQueue);
    },
    processQueue() {
      const columnIndex = this.getShortestColumnIndex();
      const item = this.queue.shift();
      this.items.push(item);
      this.columns[columnIndex].push(item);
      this.$nextTick(() => {
        if (this.queue.length) this.processQueue();
        else this.initialized = true;
      });
    },
    resetColumns() {
      this.columns = Array.from({ length: this.columnCount }, () => []);
    },
    getShortestColumnIndex() {
      if (this.columnCount <= 1) return 0;
      const heights = this.columns.map((col, i) => this.$refs[`col-${i}`][0].offsetHeight);
      const minHeight = Math.min.apply(null, heights);
      return heights.indexOf(minHeight);
    },
    getSizerWidth() {
      return this.$refs.sizer.offsetWidth;
    },
  },
};
</script>

<style lang="less">
@import "../less/variables.less";
@import "../less/typography.less";

.grid {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin: -1em -0.5em;
  min-height: 400px;
  .item {
    opacity: 0;
    transform: translateY(10%);
    transition-property: transform, opacity;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.24, 0, 0.64, 1);
    width: 100%;
    padding: 1em 0.5em;
    display: inline-block;
    vertical-align: top;
    &.item--episode {
      color: @white;
      .item__inner {
        background: @black;
      }
      .tags--inline {
        position: relative;
        z-index: 10;
        margin-top: -0.75em;
        padding: 0 1.5em 1.5em;
      }
    }
  }
  &--loaded {
    .item {
      transform: none;
      opacity: 1;
    }
  }
  .grid__sizer {
    width: 100%;
    display: none;
  }
  .mq-sm({
    margin: -0.75em;
    .item { padding: 0.75em; }
    .item, .grid__sizer { width: 100% / 2; }
  });
  .mq-md({
    .item, .grid__sizer { width: 100% / 3; }
  });
  .mq-lg({
    margin: -1em;
    .item { padding: 1em; }
  });
  .mq-xx({
    .item, .grid__sizer { width: 100% / 4; }
  });
  .grid__column {
    flex: 1;
    .item {
      width: 100%;
    }
  }
	.item {
    a {
      color: inherit;
      &:hover, &:focus {
        .item__title {
          color: @accent;
        }
      }
      &.tag {
        color: @accent;
      }
    }
    &__title {
      .fs-m;
    }
    &__inset {
      padding: 1em;
    }
    &__media {
      position: relative;
      >img, >video {
        width: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .tags--inline {
      margin-top: 0.5em;
    }
		&__inner {
			position: relative;
		}
	}
  .panel {
    margin-bottom: 0;
  }
}
</style>
