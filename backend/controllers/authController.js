const passport = require('passport');

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.loginCallback = (req, res) => {
  res.redirect('/');
};

exports.getCurrentUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
