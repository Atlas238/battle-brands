// PASSPORT TEST
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
    // WILL TAKE IN accessToken (FB.DEVELOPERS), refreshToken (FB.DEVELOPERS), profile (RETURNED PROMISE OF USER FB PROFILE)
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(..., function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
    // Profile looks like... provider(string/'fb, twitter'), id(string from provider), displayName(string/Name of User for display) name(obj, familyName, givenName, middleName), emails(arr, value, type), photos(arr, value(string))
));

// INCLUDE HTML LINK <a href="/auth/facebook">Login with Facebook</a>
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));