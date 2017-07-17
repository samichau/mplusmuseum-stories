<template>
  <aside class="blog-sidebar">
    <div class="blog-sidebar__section" v-if="blurb" v-html="$t(blurb)"></div>
    <div class="blog-sidebar__stick">
      <div class="blog-sidebar__section" v-if="categories.length">
        <h3 class="blog-sidebar__header">{{ $t(t.site.categories) }}</h3>
        <ul class="blog-categories blog-sidebar__list">
          <li class="blog-category"
          :class="{ 'blog-category--active' : !$store.getters['blog/activeCategory'] }">
            <router-link :to="{ name: 'blog' }">{{ $t(t.site.all) }}</router-link>
          </li>
          <li class="blog-category"
          v-for="category of categories"
          :class="{ 'blog-category--active' : category.active }"
          :key="category.name">
            <router-link :to="{ name: 'blog', query: { category: category.name } }">
              {{ $t(category.title) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="blog-sidebar__section" v-if="popularTags.length">
        <h3 class="blog-sidebar__header">{{ $t(t.blog.popularTags) }}</h3>
        <div class="blog-sidebar__tags">
          <tag v-for="tag of popularTags"
          :key="tag.id"
          :tag="tag"></tag>
        </div>
      </div>
      <div class="blog-sidebar__section" v-if="links.length">
        <h3 class="blog-sidebar__header">{{ $t(t.blog.other) }}</h3>
        <ul class="blog-sidebar__list">
          <li v-for="(link, i) of links" :key="i">
            <a :href="link.url" target="_blank" v-html="$t(link.title)"></a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';
import Tag from './Tag.vue';

export default {
  computed: {
    ...mapState({
      t: s => s.site.translations,
      links: s => s.blog.section.links,
      blogTags: s => s.blog.section.tags,
      siteTags: s => s.site.tags.items,
      categories: s => s.blog.section.categories,
      blurb: s => s.blog.section.blurb.html,
    }),
    popularTags() {
      return this.siteTags
        .filter(siteTag => this.blogTags.some(blogTag => blogTag === siteTag.id));
    },
  },
  components: {
    Tag,
  },
};
</script>

<style lang="less">
  @import '../less/variables.less';

  .blog-sidebar {
    text-align: center;
    .mq-sm({
      text-align: left;
    });
    &__section {
      margin-bottom: 1em;
      &:last-child {
        margin-bottom: 0;
      }
    }
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.25em;
    }
    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    &__stick {
      position: sticky;
      top: 9rem;
      .mq-lg({ top: 10rem; })
    }
  }
  .blog-category {
    color: @accent;
    list-style: none;
    &--active {
      &:before {
        content: '\2022';
        margin-right: 0.125em;
      }
    }
  }
</style>
