const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
  realm: 'Staging Area',
  file: path.resolve(__dirname, '../.htpasswd'),
});

module.exports = function basicAuth(req, res, next) {
  if (req.path === '/status') next();
  else (auth.connect(basic))(req, res, next);
};
