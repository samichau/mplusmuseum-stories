import locales from '../locale';

// Route-level code splitting
const ArticleView = () => import('../views/ArticleView.vue');
const BlogListView = () => import('../views/BlogListView.vue');
const BlogPostView = () => import('../views/BlogPostView.vue');
const ChannelsView = () => import('../views/ChannelsView.vue');
const EpisodeView = () => import('../views/EpisodeView.vue');
const ExhibitionsView = () => import('../views/ExhibitionsView.vue');
const ExploreView = () => import('../views/ExploreView.vue');
const HomeView = () => import('../views/HomeView.vue');
const JournalView = () => import('../views/JournalView.vue');
const IssueView = () => import('../views/IssueView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
const PageView = () => import('../views/PageView.vue');
const SearchView = () => import('../views/SearchView.vue');

const langParam = `:lang(${locales.join('|')})`;

function withLocale(params) {
  if (!params.lang) [params.lang] = locales;
  return params;
}

function redirectWithLang(name) {
  return to => ({ name, params: withLocale(to.params) });
}

const homeRoutes = [
  {
    name: 'home',
    path: `/${langParam}/`,
    component: HomeView,
  }, {
    name: 'default',
    path: '/',
    redirect: redirectWithLang('home'),
  },
];

const homeBlogRoutes = [
  {
    name: 'home',
    path: `/${langParam}/`,
    redirect: {
      name: 'blog',
    },
  },
  {
    name: 'default',
    path: '/',
    redirect: redirectWithLang('blog'),
  },
];

const notFoundRoute = {
  name: 'not-found',
  path: `/${langParam}/404/`,
  component: NotFoundView,
};

const pageRoutes = [
  {
    name: 'page',
    path: `/${langParam}/:page/`,
    component: PageView,
  }, {
    name: 'page-redirect',
    path: '/page/:page/',
    redirect: redirectWithLang('page'),
  },
];

const catchRoutes = [
  {
    name: '404-lang',
    path: `/${langParam}/*`,
    redirect: redirectWithLang('not-found'),
  }, {
    name: '404',
    path: '*',
    redirect: redirectWithLang('not-found'),
  },
];

const exploreRoutes = [
  {
    name: 'explore',
    path: `/${langParam}/explore`,
    component: ExploreView,
  }, {
    name: 'explore-redirect',
    path: '/explore',
    redirect: redirectWithLang('explore'),
  },
];

const searchRoutes = [
  {
    name: 'search',
    path: `/${langParam}/search`,
    component: SearchView,
  }, {
    name: 'search-redirect',
    path: '/search',
    redirect: redirectWithLang('search'),
  },
];

const blogRoutes = [
  {
    name: 'blog',
    path: `/${langParam}/blog/`,
    component: BlogListView,
  }, {
    name: 'post',
    path: `/${langParam}/blog/:post/`,
    component: BlogPostView,
  }, {
    name: 'blog-redirect',
    path: '/blog',
    redirect: redirectWithLang('blog'),
  }, {
    name: 'post-redirect',
    path: '/blog/:post',
    redirect: redirectWithLang('post'),
  },
];

const journalRoutes = [
  {
    name: 'journal',
    path: `/${langParam}/podium/`,
    component: JournalView,
  }, {
    name: 'issue',
    path: `/${langParam}/podium/:issue/`,
    component: IssueView,
  }, {
    name: 'article',
    path: `/${langParam}/podium/:issue/:article/`,
    component: ArticleView,
  }, {
    name: 'journal-redirect',
    path: '/podium/',
    redirect: redirectWithLang('journal'),
  }, {
    name: 'issue-redirect',
    path: '/podium/:issue',
    redirect: redirectWithLang('issue'),
  }, {
    name: 'article-redirect',
    path: '/podium/:issue/:article/',
    redirect: redirectWithLang('article'),
  },
];

const channelsRoutes = [
  {
    name: 'channels',
    path: `/${langParam}/channels/`,
    component: ChannelsView,
  }, {
    name: 'episode',
    path: `/${langParam}/channels/:episode/`,
    component: EpisodeView,
  }, {
    name: 'channels-redirect',
    path: '/channels/',
    redirect: redirectWithLang('channels'),
  }, {
    name: 'episode-redirect',
    path: '/channels/:episode/',
    redirect: redirectWithLang('episode'),
  },
];

const exhibitionsRoutes = [
  {
    name: 'exhibitions',
    path: `/${langParam}/interactives/`,
    component: ExhibitionsView,
  }, {
    name: 'exhibitions-redirect',
    path: '/interactives/',
    redirect: redirectWithLang('exhibitions'),
  },
];

const routes = process.env.MODE === 'BLOG'
  ? [
    ...homeBlogRoutes,
    ...blogRoutes,
    notFoundRoute,
    ...pageRoutes,
    ...catchRoutes,
  ] : [
    ...homeRoutes,
    ...blogRoutes,
    ...journalRoutes,
    ...channelsRoutes,
    ...exhibitionsRoutes,
    ...exploreRoutes,
    ...searchRoutes,
    notFoundRoute,
    ...pageRoutes,
    ...catchRoutes,
  ];

export default function () {
  return routes;
}
