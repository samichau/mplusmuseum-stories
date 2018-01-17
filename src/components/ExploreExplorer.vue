<template>
  <div class="explorer"
  :class="{
    'explorer--typing' : query.length,
    'explorer--focused' : focused,
  }">

    <div class="explorer__wrap fs-m shadow--small">

      <tag-single v-for="tag in activeTags"
      class="tag--active"
      :key="tag.id"
      :tag="tag"
      @afterClick="collapse"/>

      <div class="explorer__input">

        <label v-if="!query.length"
        for="explore">
          <span class="hide--mobile" v-html="desktop"/>
          <span class="hide--desktop" v-html="mobile"/>
        </label>

        <input name="explore"
        type="text"
        ref="input"
        @keydown.enter="onEnter"
        @keydown.up.prevent="onUp"
        @keydown.down.prevent="onDown"
        @keydown.esc="onEsc"
        @keydown.8="onBackspace"
        @focus="focus"
        v-model="query">

      </div>

    </div>

    <div class="explorer__matches fs-m shadow--small"
    :style="matchesHeight">

      <ul class="explorer__matches-list">

        <li class="explorer__matches-row" v-for="(tag, i) in filteredTags" :key="tag.id">

          <tag-single :tag="tag"
          :class="{ 'tag--selected' : i === selectedIndex }"
          @afterClick="collapse"/>

          <snippet-translate class="explorer__matches-count fs-b"
          snippet="explore.matches"
          :data="{ count: tag.count }"
          :parsers="{ count: (c) => c }"/>

        </li>

      </ul>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { focus } from 'vue-focus';
import _ from 'lodash';
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  directives: { focus },
  data() {
    return {
      desktop: '',
      desktopInterval: false,
      mobile: '',
      mobileInterval: false,
      focused: false,
      selectedIndex: 0,
    };
  },
  created() {
  },
  mounted() {
    window.addEventListener('mouseup', this.clickHandler);
    if (!this.activeTags.length) this.$refs.input.focus();
    this.typeText();
  },
  destroyed() {
    window.removeEventListener('mouseup', this.clickHandler);
  },
  computed: {
    ...mapState({
      tags: s => s.tags.entities,
      tagsOrder: s => s.tags.order,
    }),
    ...mapGetters({
      filteredTags: 'tags/filtered',
      activeTags: 'tags/active',
    }),
    query: {
      get() {
        return this.$store.state.tags.query;
      },
      set(value) {
        this.focused = true;
        this.selectedIndex = 0;
        this.$store.commit('tags/setQuery', value);
      },
    },
    labelText() {
      if (this.query.length) {
        return {
          desktop: '',
          mobile: '',
        };
      }

      if (this.activeTags.length) {
        return {
          desktop: this.$tl('explore.ctaMore'),
          mobile: this.$tl('explore.ctaMoreShort'),
        };
      }

      return {
        desktop: this.$tl('explore.cta'),
        mobile: this.$tl('explore.ctaShort'),
      };
    },
    matchesHeight() {
      const tagHeight = 1.65;
      const padding = 0.5;
      let height = 0;
      if ((this.query.length && this.filteredTags.length)
      || (this.activeTags.length && this.focused && !this.query.length)) {
        height = (this.filteredTags.length * tagHeight) + padding;
      }
      return `height: ${height}em;`;
    },
  },
  watch: {
    labelText(val) {
      if (val.desktop !== this.desktop || val.mobile !== this.mobile) {
        this.typeText();
      }
    },
  },
  methods: {
    focus() {
      this.focused = true;
    },
    collapse() {
      this.focused = false;
      this.selectedIndex = -1;
    },
    clickHandler(e) {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.collapse();
      } else {
        this.$refs.input.focus();
      }
    },
    onEsc() {
      if (!this.query.length) {
        this.collapse();
      } else {
        this.query = '';
      }
    },
    onBackspace() {
      if (!this.query.length) {
        const tags = this.activeTags;
        tags.pop();
        this.setTags(tags);
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    onEnter() {
      if (this.filteredTags.length && this.selectedIndex >= 0) {
        const tags = this.activeTags;
        tags.push(this.filteredTags[this.selectedIndex]);
        this.setTags(tags);
        this.collapse();
      }
    },
    onUp() {
      if (this.filteredTags.length && this.focused) {
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredTags.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
      }
    },
    onDown() {
      if (this.filteredTags.length && this.focused) {
        if (this.selectedIndex >= this.filteredTags.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
      }
    },
    setTags(tags) {
      const tagNames = tags.map(tag => tag.name);
      this.$router.push({ name: 'explore', query: { tag: tagNames } });
    },
    resetText(type, interval) {
      this[type] = '';
      clearInterval(this[interval]);
      this[interval] = false;
    },
    typeLetter(type, text, count) {
      this[type] = text.slice(0, count);
    },
    typeText() {
      _.each(this.labelText, (text, type) => {
        const interval = `${type}Interval`;
        this.resetText(type, interval);
        this[interval] = setInterval(() => {
          const { length } = this[type];
          if (length >= text.length) clearInterval(this[interval]);
          else this.typeLetter(type, text, length + 1);
        }, 35);
      });
    },
  },
  components: {
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.explorer {
  margin-bottom: 1.5em;
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    background: @white;
    padding: 0 0.25em;
  }
  &__input {
    position: relative;
    input, label {
      line-height: 1.5;
      height: 2em;
      padding: 0.25em 0.25em 0.25em 0.25em;
      display: block;
    }
    label {
      color: @grey;
    }
    input {
      width: 100%;
      left: 0;
      top: 0;
      border: none;
      background: transparent;
      position: absolute;
    }
  }
  &__suggested {
    display: none;
    .mq-sm({
      display: block;
    });
  }
  &__matches {
    overflow: hidden;
    height: 0;
    transition: height 0.4s ease;
    background: @white;
  }
  &__matches-list {
    list-style: none;
    margin: 0;
    padding: 0.25em;
  }
  &__matches-row {
    display: flex;
    align-items: center;
  }
  &__matches-count {
    margin-left: 0.5em;
  }
  &--typing {
    .explorer__input {
      flex-grow: 1;
      input {
        position: static;
      }
    }
    .explorer__suggested {
      position: absolute;
    }
  }
}

</style>
