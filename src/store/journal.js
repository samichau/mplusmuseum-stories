import Vue from 'vue';
import _find from 'lodash/find';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      page: false,
      article: false,
      issue: false,
      articles: {},
      issues: {},
    },

    getters: {
      issue(state) {
        if (!state.issue || !state.issues) return false;
        return state.issues[state.issue];
      },
      article(state) {
        if (!state.article || !state.articles) return false;
        return state.articles[state.article];
      },
    },

    actions: {
      init(context) {
        // If we have already initialized the page, we don't need to fetch data
        if (context.state.page !== false) {
          return Promise.resolve(new Response(true));
        }

        return asyncGet('journal/')
          .then((response) => {
            context.commit('init', response.data);
            return response;
          });
      },
      initIssue(context, { issue }) {
        const storedIssue = _find(context.state.issues, iss => iss.name === issue);

        if (storedIssue) {
          context.commit('setIssue', storedIssue.id);
          return Promise.resolve(new Response(true));
        }

        return asyncGet(`journal/issues/${issue}/`)
          .then((response) => {
            const { data: newIssue } = response;
            context.commit('addIssue', newIssue);
            context.commit('setIssue', newIssue.id);
            return response;
          });
      },

      initArticle(context, { issue, article }) {
        const storedArticle = _find(context.state.articles, art => art.name === article);

        if (storedArticle) {
          context.commit('setArticle', storedArticle.id);
          return Promise.resolve(new Response(true));
        }

        return asyncGet(`journal/issues/${issue}/${article}/`)
          .then((response) => {
            const { data: newArticle } = response;
            context.commit('addArticle', newArticle);
            context.commit('setArticle', newArticle.id);
            return response;
          });
      },

      getArticle(context, { issue, article }) {
        return asyncGet(`journal/issues/${issue}/${article}/`)
          .then((response) => {
            const { data: newArticle } = response;
            context.commit('addArticle', newArticle);
            return response;
          });
      },
    },

    mutations: {
      init(state, payload) {
        state.page = payload;
      },
      addArticle(state, payload) {
        Vue.set(state.articles, payload.id, payload);
      },
      setArticle(state, id) {
        state.article = id;
      },
      addIssue(state, payload) {
        Vue.set(state.issues, payload.id, payload);
      },
      setIssue(state, id) {
        state.issue = id;
      },
    },
  };
}
