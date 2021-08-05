const socialLinkRouter = require('express').Router();
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLinkedIn = require('passport-linkedin-oauth2');

// PASSPORT-FACEBOOK SETUP
const FacebookStrategy = passportFacebook.Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/passport/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

// LINKEDIN SETUP
const LinkedInStrategy = passportLinkedIn.Strategy;
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3001/passport/auth/linkedin/callback",
    state: true
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(err, profile);
    });
}));

// User Serialize Setps...
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Facebook Auth Routes - first route sends to FB for login
socialLinkRouter.get('/passport/auth/facebook', passport.authenticate('facebook'));
// Callback route for when user returns
socialLinkRouter.get('/passport/auth/facebook/callback',
  passport.authenticate('facebook', { successMessage:'IT WORKS!', failureMessage: 'IT DOESNT WORK!'}));

// // Linkedin Route (also docs)
socialLinkRouter.get('/passport/auth/linkedin', passport.authenticate('linkedin'), function(req, res){
    // Redirected to LinkedIn for auth, function not called
});
// Callback route for when user returns
socialLinkRouter.get('/passport/auth/linkedin/callback',
  passport.authenticate('linkedin', { successMessage: 'IT WORKS!', failureMessage: 'IT DOESNT WORK!' }));

module.exports = socialLinkRouter;