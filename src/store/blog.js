import _find from 'lodash/find';
import { asyncGet, Response } from '../api';

function addPostProperties(post) {
  post.collapsed = !post.sections;
  post.truncated = post.sections && post.sections.truncateAfter;
  if (!post.sections) post.sections = false;
  return post;
}

function addCategoryProperties(category) {
  category.active = false;
  return category;
}

export default {
  namespaced: true,

  state: {
    meta: false,
    notices: [],
    single: false,
    posts: [],
    postsRemaining: 0,
    postsFiltered: [],
    postsFilteredRemaining: 0,
    categories: [],
    tags: [],
    links: [],
    initialized: {
      meta: false,
      posts: false,
      postsFiltered: false,
    },
  },

  getters: {
    activeCategory(state) {
      return _find(state.categories, c => c.active) || false;
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
            if (selectors.meta) context.commit('initMeta', response.data);
            context.commit('init', { items, posts: response.data.posts });
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
    expandPost(context, post) {
      const postSections = !post.sections
        ? asyncGet(`blog/posts/${post.name}/`)
        : Promise.resolve(new Response(true).setData({ sections: false }));
      return postSections
        .then(({ data }) => {
          context.commit('expandPost', { post, sections: data.sections });
        });
    },
    initSingle(context, name) {
      let endpoint = `blog/posts/${name}/`;
      if (!context.state.initialized.meta) endpoint += '?meta=true';

      const postData = !(context.state.single && context.state.single.name === name)
        ? asyncGet(endpoint)
        : Promise.resolve(new Response(true, { status: false, data: context.state.single }));

      return postData
        .then((response) => {
          context.commit('setPost', response.data);
          if (!context.state.initialized.meta) context.commit('initMeta', response.data);
          return response;
        });
    },
  },

  mutations: {
    initMeta(state, data) {
      state.meta = {
        title: data.title,
        description: data.desc,
      };
      state.categories = data.section.categories.map(category => addCategoryProperties(category));
      state.tags = data.section.tags;
      state.links = data.section.links;
      state.initialized.meta = true;
      state.notices = data.notices;
    },
    init(state, { items, posts }) {
      state[items] = posts.items.map(post => addPostProperties(post));
      state[`${items}Remaining`] = posts.remaining;
      state.initialized[items] = true;
    },
    addPosts(state, { items, remaining, posts }) {
      state[items] = state[items].concat(posts.items.map(post => addPostProperties(post)));
      state[remaining] = posts.remaining;
    },
    expandPost(state, { post, sections }) {
      if (sections) post.sections = sections;
      post.collapsed = false;
      post.truncated = false;
    },
    collapsePost(state, post) {
      post.collapsed = true;
      post.truncated = true;
    },
    extendPost(state, post) {
      post.truncated = false;
    },
    setCategory(state, categoryName) {
      state.categories.forEach((category) => {
        category.active = category.name === categoryName;
      });
    },
    setPost(state, post) {
      state.single = post;
    },
  },
};
