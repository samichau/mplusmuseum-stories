const sitemap = require('sitemap');

module.exports = function getSitemap(data, res) {
  const sm = sitemap.createSitemap(data);
  sm.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.setHeader('Content-Type', 'application/xml');
    return res.send(xml);
  });
};
