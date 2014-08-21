
/*
 * passport for authentiacation
 */

var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy;

var mongoStore = require('connect-mongo');

var User = mongoose.model('User');

module.exports = function (passport) {

  //serialize and deserialize user instances to and from the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  });


  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('Incorrect username.')
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          console.log('Incorrect password.')
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

 }