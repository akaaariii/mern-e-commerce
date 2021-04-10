const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

const keys = require('../config/keys');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch(err => console.error(err))
});

// creates a new instance of google strategy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/api/auth/google/callback',
  proxy: true
}, async (acessToken, refreshToken, profile, done) => {
  // console.log(profile)
  const existingUser = await User.findOne({ googleId: profile.id });

  if(existingUser){
    return done(null, existingUser)
  }

  // email check
  const user = await new User(
    { 
      googleId: profile.id, 
      name: profile.name.givenName, 
      email: profile.emails[0].value,
      // password: bcrypt.hashSync('123456', 10),
    }
  ).save();
  
  done(null, user);
}));