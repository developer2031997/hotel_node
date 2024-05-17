const Person = require('./models/person.model');
const passport = require('passport');
const LocalStrategy = require( 'passport-local' ).Strategy;

passport.use(new LocalStrategy(
  async  function(username, password, done) {
        const user = await Person.findOne({ username: username });
        if (!user) { return done(null, false, { message: 'Incorrect username.'}); }

        const isPassword = await user.comparePassword(password);  
        if (!isPassword) { return done(null, false, { message: 'Incorrect password.'}); }
        return done(null, user);
      
    }
  ));

  module.exports = passport;