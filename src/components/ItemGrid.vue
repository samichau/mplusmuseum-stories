<template>
  <div class="grid content-minheight" :class="{ 'grid--loaded': initialized }">

    <component v-for="item in content"
    :key="item.id"
    :is="`item-${item.type}`"
    :item="item"/>

  </div>
</template>

<script>
import Bricklayer from 'bricklayer';
import ItemArticle from './ItemArticle.vue';
import ItemEpisode from './ItemEpisode.vue';
import ItemExhibition from './ItemExhibition.vue';
import ItemIssue from './ItemIssue.vue';
import ItemPost from './ItemPost.vue';

export default {
  data() {
    return {
      layout: false,
      initialized: false,
    };
  },
  props: {
    content: {
      required: true,
    },
  },
  components: {
    ItemArticle,
    ItemEpisode,
    ItemExhibition,
    ItemIssue,
    ItemPost,
  },
  methods: {
    initLayout() {
      this.layout = new Bricklayer(this.$el, {
        rulerClassName: 'grid__sizer',
        columnClassName: 'grid__column',
      });

      // Again we unfortunately need to wait for the columns to sort
      // Otherwise the transitions will not work
      setTimeout(this.initialize, 25);
    },
    initialize() {
      this.initialized = true;
    },
    // Currently unused
    redraw() {
      this.layout.redraw();
    },
  },
  mounted() {
    this.$nextTick(() => {
      // Set timeout to wait for image placeholders to render
      setTimeout(this.initLayout, 50);
    });
  },
  destroyed() {
    this.layout.destroy();
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
      >img, >video {
        width: 100%;
        display: block;
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
