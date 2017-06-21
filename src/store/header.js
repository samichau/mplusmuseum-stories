import { routes as translations } from '../locale/translations';

export default {
  namespaced: true,
  state: {
    nav: [
      {
        name: 'blog',
        params: false,
        content: translations.blog,
      }, {
        name: 'page',
        params: {
          page: 'about',
        },
        content: translations.about,
      },
    ],
    marquee: [
      {
        content: {
          en: 'M+ Stories is the new M+ online curatorial platform',
          tc: 'M +故事是新的M +在線策展平台',
        },
      },
    ],
  },
};
