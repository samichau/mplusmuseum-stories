<template>
  <div class="sharebar">
    <span class="sr-only">Share this Content</span>
    <transition-group class="sharebar__items" name="resize" mode="out-in" tag="div">
      <a v-for="(item, i) of items"
        class="sharebar__block"
        :class="[`sharebar__block--${item.name}`, {
          'hide--mobile': item.hide.mobile,
          'hide--desktop': item.hide.desktop,
        }]"
        @click="share(item.share, $event)"
        :key="item.id"
        :href="item.share | shareLink({
          location: url,
          title: title,
        })">
        <div class="sharebar__block-inner">
          <span class="sr-only">Share on {{ $t(item.title) }}</span>
          <div class="sharebar__block-background" :style="{ 'background-color': item.colour }"></div>
          <img :src="item.icon" :alt="`${$t(item.title)} Icon`">
        </div>
      </a>
    </transition-group>

    <button v-if="$store.state.site.social.length > limit"
      class="sharebar__block"
      @click="toggle">
      <div class="sharebar__block-inner">
        <span class="sr-only">More Sharing Options</span>
        <div class="sharebar__block-background"></div>
        <img v-if="expanded" src="../assets/img/minus.svg" alt="Close">
        <img v-else src="../assets/img/plus.svg" alt="Expand">
      </div>
    </button>

  </div>
</template>

<script>
function prepareURI(url, { location, title }) {
  url = url.replace('{title}', encodeURIComponent(title));
  url = url.replace('{location}', location);
  return url;
}

export default {
  props: {
    url: {
      required: true,
    },
    title: {
      required: true,
    },
    limit: {
      default: 3,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  filters: {
    shareLink(val, data) {
      return prepareURI(val, data);
    },
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    },
    share(shareURI, e) {
      if (shareURI.startsWith('http')) {
        e.preventDefault();
        let top = 100;
        let left = 100;
        if (window.screen) {
          top = Math.round(window.screen.height / 3);
          left = Math.round((window.screen.width / 2) - 275);
        }
        shareURI = prepareURI(shareURI, {
          location: this.url,
          title: this.title,
        });
        window.open(shareURI, 'Share', `scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=${top},left=${left}`);
      }
    },
  },
  computed: {
    items() {
      const socialItems = this.$store.getters['site/socialShareables'];
      return this.expanded ? socialItems : socialItems.slice(0, this.limit);
    },
  },
};
</script>

<style lang="less">
@import '../less/variables.less';

@blockSizeSmall: 3.5rem;
@blockSize: 4rem;

.resize-enter-active, .resize-leave-active {
  transition: all .25s ease;
}

.sharebar__block.resize-enter, .sharebar__block.resize-leave-active {
  width: 0;
  height: @blockSizeSmall;
  .mq-sm({
    width: @blockSize;
    height: 0;
  });
}

.sharebar {
  display: flex;
  flex-direction: row;
  margin: 0 0 1.5rem 0;
  .mq-sm({
    margin: 0;
    flex-direction: column;
  });
  &__items {
    display: flex;
    flex-direction: row;
    .mq-sm({
      flex-direction: column;
    });
  }
  &__block {
    width: @blockSizeSmall;
    height: @blockSizeSmall;
    line-height: @blockSizeSmall;
    .mq-sm({
      width: @blockSize;
      height: @blockSize;
      line-height: @blockSize;
    });
    background: none;
    overflow: hidden;
    padding: 0;
    border: none;
    display: inline-block;
    vertical-align: top;
    background-color: @accent;
    color: @white;
    text-align: center;
    box-shadow: @shadowStyleSmall;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
    }
    &:hover {
      .sharebar__block-background {
        // display: block;
        opacity: 1;
      }
    }
  }
  &__block-inner {
    height: @blockSizeSmall;
    width: @blockSizeSmall;
    padding: @blockSizeSmall * 0.15;
    .mq-sm({
      height: @blockSize;
      width: @blockSize;
      padding: @blockSize * 0.15;
    });
    position: relative;
  }
  &__block-background {
    opacity: 0;
    // transition: .125s ease opacity;
    position: absolute;
    top: 0;
    left: 0;
    background: @midgrey;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &--horizontal {
    flex-direction: row;
    .sharebar__items {
      flex-direction: row-reverse;
    }
    .sharebar__block.resize-enter, .sharebar__block.resize-leave-active {
      width: 0;
      height: @blockSizeSmall;
      .mq-sm({
        height: @blockSize;
      });
    }
  }
}
</style>
