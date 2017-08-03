module.exports = function paramViaQuery(req, res, next) {
  if (req.query.r) {
    return res.redirect(301, `${req.path}/${req.query.r}`);
  }
  return next();
};
