const locales = require('../src/locale/browser.js');

function getBrowserLocales() {
  // Create flattened array of all the locales
  const browserLocales = [];
  locales.groups.forEach(group =>
    locales.accepts[group].forEach(locale =>
      browserLocales.push(locale)));
  return browserLocales;
}

function startsWithSomeLocale(path) {
  return locales.groups.some(locale => (path === `/${locale}` || path.startsWith(`/${locale}/`)));
}

function getUserLanguagePreference(req) {
  const cookieLang = req.cookies.lang;
  const browserLocales = getBrowserLocales();
  const browserLang = req.acceptsLanguages(browserLocales);

  const lang = cookieLang || browserLang;
  return lang;
}

module.exports = function detectLanguage(req, res, next) {
  // Set language
  if (req.path === '' || req.path === '/') {
    const lang = getUserLanguagePreference(req);

    // Find a match
    if (lang) {
      const localeMatch = locales.groups.find(group =>
        locales.accepts[group].indexOf(lang) >= 0);
      if (localeMatch) return res.redirect(302, `/${localeMatch}/`);
    }
  } else if (!startsWithSomeLocale(req.path)) {
    const lang = getUserLanguagePreference(req);
    if (lang) {
      const localeMatch = locales.groups.find(group =>
        locales.accepts[group].indexOf(lang) >= 0);
      if (localeMatch) {
        const newPath = `/${localeMatch}${req.path}`;
        return res.redirect(302, newPath);
      }
    }
  }
  return next();
};
