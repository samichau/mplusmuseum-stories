import Vue from 'vue';
import _find from 'lodash/find';
import { asyncGet, Response } from '../api';

export default function () {
  return {
    namespaced: true,

    state: {
      page: false,
      // Active episode reference
      episode: false,
      // Episode entities
      episodes: {},
    },

    getters: {
      episode(state) {
        return state.episodes[state.episode];
      },
    },

    actions: {
      init(context) {
        // If we have already initialized the page, we don't need to fetch data
        if (context.state.page !== false) {
          return Promise.resolve(new Response(true));
        }

        return asyncGet('channels/').then((response) => {
          context.commit('init', response.data);
          return response;
        });
      },
      initEpisode(context, { episode }) {
        const storedEpisode = _find(context.state.episodes, ep => ep.name === episode);

        if (storedEpisode) {
          context.commit('setEpisode', storedEpisode.id);
          return Promise.resolve(new Response(true));
        }

        return asyncGet(`channels/episodes/${episode}/`)
          .then((response) => {
            const { data: newEpisode } = response;
            context.commit('addEpisode', newEpisode);
            context.commit('setEpisode', newEpisode.id);
            return response;
          });
      },
    },

    mutations: {
      init(state, payload) {
        state.page = payload;
      },
      addEpisode(state, payload) {
        Vue.set(state.episodes, payload.id, payload);
      },
      setEpisode(state, id) {
        state.episode = id;
      },
    },

  };
}
