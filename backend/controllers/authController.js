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
  // Invoking logout() will remove the req.user property and clear the login session.
  req.logout();
  res.redirect('/');
};
