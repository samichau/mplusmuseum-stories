import Vue from 'vue';
import _clone from 'lodash/clone';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _pick from 'lodash/pick';
import { asyncGet, Response } from '../api';

function postsWithTruncatedData(posts) {
  return posts.map(post => ({
    id: post.id,
    truncated: !!(post.content && post.content.truncateAfter),
  }));
}

export default function () {
  return {
    namespaced: true,

    state: {
      page: false,
      post: false,
      posts: {},
      category: false,
      // status
      notices: false,
      showing: 'unfiltered',
      filtered: [],
      filteredRemaining: false,
      unfiltered: [],
      unfilteredRemaining: false,
    },

    getters: {
      categories(state, getters, { translations }) {
        if (!state.page) return [];
        const { categories } = state.page;
        const newCategory = {
          title: translations.blog.allCategories,
          name: false,
          active: false,
        };
        if (!state.category) newCategory.active = true;

        const newCategories = categories.map((cat) => {
          const obj = {
            title: cat.title,
            name: cat.name,
            active: false,
          };
          if (state.category.id === cat.id) obj.active = true;
          return obj;
        });

        return [newCategory, ...newCategories];
      },
      post({ post, posts }) {
        return post ? posts[post] : false;
      },
      posts(state) {
        const posts = state[state.showing];
        return posts.map((p) => {
          const post = _clone(state.posts[p.id]);
          post.truncated = p.truncated;
          return post;
        });
      },
      remaining(state) {
        return state[`${state.showing}Remaining`];
      },
    },

    actions: {
      initPosts(context, { category }) {
        // Get posts in category
        if (category) return context.dispatch('initFiltered', category);
        return context.dispatch('initUnfiltered');
      },

      initFiltered(context, category) {
        const type = 'filtered';

        if (context.state.filtered.length && category === context.state.category) {
          context.commit('setShowing', type);
          return Promise.resolve(new Response(true));
        }
        return asyncGet('blog', { category })
          .then((response) => {
            const {
              data,
              data: {
                posts, remaining, category: cat, notices,
              },
            } = response;
            context.dispatch('addPosts', posts);
            context.commit('setPosts', { type, posts });
            context.commit('setPostsRemaining', { type, remaining });
            context.commit('setShowing', type);
            context.commit('setCategory', cat);
            context.commit('setNotices', notices);
            if (!context.state.page) context.commit('setPage', data);
            return response;
          });
      },

      initUnfiltered(context) {
        const type = 'unfiltered';

        if (context.state.unfiltered.length) {
          context.commit('setShowing', type);
          context.commit('setCategory', false);
          return Promise.resolve(new Response(true));
        }

        // Get posts
        return asyncGet('blog')
          .then((response) => {
            const { data, data: { posts, remaining, notices } } = response;
            context.dispatch('addPosts', posts);
            context.commit('setPosts', { type, posts });
            context.commit('setPostsRemaining', { type, remaining });
            context.commit('setShowing', type);
            context.commit('setCategory', false);
            context.commit('setNotices', notices);
            if (!context.state.page) context.commit('setPage', data);
            return response;
          });
      },

      getPosts(context, { type, selectors }) {
        return asyncGet('blog', selectors)
          .then((response) => {
            const { data: { posts, remaining } } = response;
            context.dispatch('addPosts', posts);
            context.commit('appendPosts', { type, posts });
            context.commit('setPostsRemaining', { type, remaining });
            return response;
          });
      },

      addPosts(context, posts) {
        posts.forEach((post) => {
          const postInStore = context.state.posts[post.id];
          if (!postInStore) context.commit('addPost', post);
        });
      },

      initPost(context, { post }) {
        const storedPost = _find(context.state.posts, po => po.name === post);

        if (storedPost) {
          context.commit('setPost', storedPost.id);
          return Promise.resolve(new Response(true));
        }

        return asyncGet(`blog/posts/${post}/`)
          .then((response) => {
            const { data: newPost } = response;
            context.commit('addPost', newPost);
            context.commit('setPost', newPost.id);
            return response;
          });
      },
    },

    mutations: {
      setCategory(state, category) {
        state.category = category;
      },

      setNotices(state, index) {
        state.notices = index;
      },

      // NEW
      // Add post entity
      addPost(state, post) {
        Vue.set(state.posts, post.id, post);
      },
      // Set the page data
      setPage(state, data) {
        state.page = _pick(data, [
          'blurb',
          'categories',
          'desc',
          'generated',
          'id',
          'name',
          'simulacrum',
          'title',
        ]);
      },
      // Set the post reference
      setPost(state, id) {
        state.post = id;
      },
      // Set the posts references
      setPosts(state, { type, posts }) {
        state[type] = postsWithTruncatedData(posts);
      },
      // Add to the posts references
      appendPosts(state, { type, posts }) {
        state[type] = state[type].concat(postsWithTruncatedData(posts));
      },
      // Set if we have more posts to get or not (boolean)
      setPostsRemaining(state, { type, remaining }) {
        state[`${type}Remaining`] = remaining;
      },
      // Set the type of posts we are showing (filtered or unfiltered)
      setShowing(state, type) {
        state.showing = type;
      },
      // Extent a post
      extendPost(state, post) {
        const posts = state[state.showing];
        const index = _findIndex(posts, p => p.id === post.id);
        state[state.showing][index].truncated = false;
      },
      // Collapse a post
      collapsePost(state, post) {
        const posts = state[state.showing];
        const index = _findIndex(posts, p => p.id === post.id);
        state[state.showing][index].truncated = true;
      },
    },
  };
}
