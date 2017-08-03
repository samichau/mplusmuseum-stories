const locales = require('../src/locale/browser.js');

module.exports = function detectLanguage(req, res, next) {
  // Set language
  if (req.path === '' || req.path === '/') {
    // Create flattened array of all the locales
    const allLocales = [];
    locales.groups.forEach(group =>
      locales.accepts[group].forEach(locale =>
        allLocales.push(locale)));
    // Find a match
    const lang = req.acceptsLanguages(allLocales);
    if (lang) {
      const localeMatch = locales.groups.find(group =>
        locales.accepts[group].indexOf(lang) >= 0);
      if (localeMatch) return res.redirect(302, `/${localeMatch}/`);
    }
  }
  return next();
};
