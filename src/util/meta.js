import _unescape from 'lodash/unescape';
import { htmlDocument, openGraph } from '../locale';

function getMeta(vm) {
  const metaObj = {};
  const state = vm.$store.state;
  const lang = state.lang;
  const siteTitle = state.site.title[lang];
  const siteDescription = state.site.desc[lang];
  let { meta } = vm.$options;

  meta = typeof meta === 'function'
    ? meta.call(vm)
    : meta;

  metaObj.title = meta.title ? `${_unescape(meta.title)} - ${siteTitle}` : siteTitle;
  metaObj.description = meta.description ? `${_unescape(meta.description)}` : siteDescription;
  metaObj.image = meta.image || state.site.simulacrum || '';
  metaObj.url = state.site.url + state.route.path;
  metaObj.lang = htmlDocument[lang];
  metaObj.ogLang = openGraph[lang];
  metaObj.type = meta.type || 'website';

  return metaObj;
}

export function setClient(vm) {
  const meta = getMeta(vm);
  document.title = meta.title;
  document.documentElement.setAttribute('lang', meta.lang);
}

export function setServer(vm) {
  const meta = getMeta(vm);
  vm.$ssrContext.title = meta.title;
  // These properties only need to update when SSR
  vm.$ssrContext.description = meta.description;
  vm.$ssrContext.image = meta.image;
  vm.$ssrContext.url = meta.url;
  vm.$ssrContext.lang = meta.lang;
  vm.$ssrContext.ogLang = meta.ogLang;
  vm.$ssrContext.type = meta.type;
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
