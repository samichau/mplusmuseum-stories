import _unescape from 'lodash/unescape';
import { site } from '../locale/translations';
import { openGraph } from '../locale';

function getMeta(vm) {
  const metaObj = {};
  const lang = vm.$store.state.lang;
  const siteTitle = site.title[lang];
  let { meta } = vm.$options;

  meta = typeof meta === 'function'
    ? meta.call(vm)
    : meta;

  metaObj.title = meta.title ? `${_unescape(meta.title)} - ${siteTitle}` : siteTitle;
  metaObj.description = meta.description ? `${_unescape(meta.description)}` : site.description[lang];
  metaObj.image = meta.image || '';
  metaObj.url = vm.$store.state.site.url + vm.$store.state.route.path;
  metaObj.lang = openGraph[lang];

  return metaObj;
}

export function setClient(vm) {
  const meta = getMeta(vm);
  document.title = meta.title;
}

export function setServer(vm) {
  const meta = getMeta(vm);
  vm.$ssrContext.title = meta.title;
  // These properties only need to update when SSR
  vm.$ssrContext.description = meta.description;
  vm.$ssrContext.image = meta.image;
  vm.$ssrContext.url = meta.url;
  vm.$ssrContext.lang = meta.lang;
}

const serverMetaMixin = {
  created() {
    setServer(this);
  },
};

const clientMetaMixin = {
  mounted() {
    setClient(this);
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin;
