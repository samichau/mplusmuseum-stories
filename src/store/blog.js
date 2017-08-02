import Vue from 'vue';
import _find from 'lodash/find';
import { asyncGet, Response } from '../api';

function addPostProperties(post) {
  Vue.set(post, 'truncated', post.sections && post.sections.truncateAfter);
  if (!post.sections) post.sections = false;
  return post;
}

function addCategoryProperties(category) {
  Vue.set(category, 'active', false);
  return category;
}

export default function () {
  return {
    namespaced: true,

    state: {
      initialized: {
        meta: false,
        posts: false,
        postsFiltered: false,
      },
      posts: [],
      postsRemaining: false,
      postsFiltered: [],
      postsFilteredRemaining: false,
      section: {},
      single: false,
    },

    getters: {
      activeCategory(state) {
        return _find(state.section.categories, c => c.active) || false;
      },
      filtered(state, getters, rootState, rootGetters) {
        const author = rootGetters['site/activeAuthor'];
        const category = getters.activeCategory;
        const tags = rootGetters['site/tags/active'];

        return author || category || tags.length;
      },
    },

    actions: {
      asyncInit(context, selectors) {
        let doAsync = true;
        let items = 'posts';

        // IF filter present THEN get filtered posts via async
        // ELSE IF already unfiltered in store THEN show unfiltered
        if (selectors.author || selectors.category || selectors.tags.length) {
          items = 'postsFiltered';
        } else if (context.state.initialized.posts) {
          doAsync = false;
        }

        if (doAsync) {
          return asyncGet('blog/posts/', selectors)
            .then((response) => {
              if (selectors.meta) context.commit('initSectionData', response.data);
              context.commit('initPosts', { items, posts: response.data.posts });
              return response;
            });
        }

        return new Response(true);
      },
      init(context, { category, author, tags }) {
        context.commit('setCategory', category);
        context.commit('site/setAuthor', author, { root: true });
        // If to is undefined, i.e. no tags are selected, pass an empty array
        // Router will pass a string if only one tag is selected, so cast to array
        if (typeof tags === 'undefined') tags = [];
        else if (!Array.isArray(tags)) tags = [tags];
        context.commit('site/tags/setActive', tags, { root: true });
      },
      getPosts(context, { items, remaining, selectors }) {
        return asyncGet('blog/posts/', selectors)
          .then(({ data }) => {
            context.commit('addPosts', { items, remaining, posts: data.posts });
          });
      },
      initSingle(context, name) {
        const selectors = !context.state.initialized.meta ? { meta: true } : {};
        const postData = !(context.state.single && context.state.single.name === name)
          ? asyncGet(`blog/posts/${name}/`, selectors)
          : Promise.resolve(new Response(true, { status: false, data: context.state.single }));

        return postData
          .then((response) => {
            context.commit('setPost', response.data);
            if (!context.state.initialized.meta) context.commit('initSectionData', response.data.sectionData);
            return response;
          });
      },
    },

    mutations: {
      initSectionData(state, data) {
        data.categories = data.categories.map(category => addCategoryProperties(category));
        state.section = data;
        state.initialized.meta = true;
      },
      initPosts(state, { items, posts }) {
        state[items] = posts.items.map(post => addPostProperties(post));
        state[`${items}Remaining`] = posts.remaining;
        state.initialized[items] = true;
      },
      addPosts(state, { items, remaining, posts }) {
        state[items] = state[items].concat(posts.items.map(post => addPostProperties(post)));
        state[remaining] = posts.remaining;
      },
      extendPost(state, post) {
        post.truncated = false;
      },
      setCategory(state, categoryName) {
        state.section.categories.forEach((category) => {
          category.active = category.name === categoryName;
        });
      },
      setPost(state, post) {
        state.single = {
          author: post.author,
          category: post.category,
          date: post.date,
          desc: post.desc,
          hero: post.hero,
          id: post.id,
          name: post.name,
          related: post.related,
          sections: post.sections,
          simulacrum: post.simulacrum,
          tags: post.tags,
          title: post.title,
        };
      },
    },
  };
}
