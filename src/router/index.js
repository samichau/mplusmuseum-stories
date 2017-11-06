import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

export function createRouter() {
  return new Router({
    routes: routes(),
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (to.params.lang !== from.params.lang) return {};
      if (savedPosition) return savedPosition;
      else if (to.query.r) return {};
      return { y: 0 };
    },
  });
}
