module.exports = function httpToHttps(req, res, next) {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'].toLowerCase() === 'http') {
    console.log('Perform http to https redirect');
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  return next();
};
