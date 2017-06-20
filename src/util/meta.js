import _unescape from 'lodash/unescape';
import { site } from '../locale/translations';

function getMeta(vm) {
  const metaObj = {};
  const siteTitle = site.title[vm.$store.state.lang];
  let { meta } = vm.$options;

  meta = typeof meta === 'function'
    ? meta.call(vm)
    : meta;

  metaObj.title = meta.title
    ? `${_unescape(meta.title)} - ${siteTitle}`
    : siteTitle;

  metaObj.description = meta.description
    ? `${_unescape(meta.description)}`
    : site.description[vm.$store.state.lang];

  return metaObj;
}

export function setTitleClient(vm) {
  const meta = getMeta(vm);
  if (meta.title) {
    document.title = meta.title;
  }
}

export function setTitleServer(vm) {
  const meta = getMeta(vm);
  if (meta.title) vm.$ssrContext.title = meta.title;
  // Description only needed on SSR
  if (meta.description) vm.$ssrContext.description = meta.description;
}

const serverMetaMixin = {
  created() {
    setTitleServer(this);
  },
};

const clientMetaMixin = {
  mounted() {
    setTitleClient(this);
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin;
