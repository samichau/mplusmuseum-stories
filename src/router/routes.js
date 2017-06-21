import locales from '../locale';

// route-level code splitting
const PageView = () => System.import('../views/PageView.vue');
const BlogListView = () => System.import('../views/BlogListView.vue');
const BlogPostView = () => System.import('../views/BlogPostView.vue');
const NotFoundView = () => System.import('../views/NotFoundView.vue');

const langParam = `:lang(${locales.join('|')})`;

export default [
  {
    name: 'default',
    path: '/',
    redirect: {
      name: 'blog',
      params: {
        lang: locales[0],
      },
    },
  },
  {
    name: 'home',
    path: `/${langParam}`,
    redirect: {
      name: 'blog',
    },
  }, {
    name: 'blog',
    path: `/${langParam}/blog/`,
    component: BlogListView,
  }, {
    name: 'blog-post',
    path: `/${langParam}/blog/:name`,
    component: BlogPostView,
  }, {
    name: 'not-found',
    path: `/${langParam}/404/`,
    component: NotFoundView,
  }, {
    name: 'page',
    path: `/${langParam}/:page`,
    component: PageView,
  }, {
    name: '404',
    path: '*',
    redirect: {
      name: 'not-found',
      params: {
        lang: locales[0],
      },
    },
  },
];
