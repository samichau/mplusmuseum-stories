import _includes from 'lodash/includes';
import locales from '../locale';

export default function (route, store) {
  let primary = route.params.lang;
  let secondary = locales[1];
  if (!_includes(locales, primary)) [primary] = locales;
  if (primary === locales[1]) {
    [secondary] = locales;
  } else {
    [primary] = locales;
  }
  store.commit('setLanguage', { primary, secondary });
}
