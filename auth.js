const passport = require('passport');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID='88353716287-3ahfhmhk5g67vq76mibtep884qpfl195.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET='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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});