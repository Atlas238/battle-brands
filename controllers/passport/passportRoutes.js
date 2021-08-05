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
    consumerKey: process.env.LINKEDIN_API_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3001/passport/auth/linkedin/callback"
}, function(token, tokenSecret, profile, done) {
      return done(err, profile);
}
));

// User Serialize Setps...
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// FB Route (Following example format from docs --- they store FB auth data for login purposes, dont necessarily need to add anything to db and then wouldnt need federated route)
socialLinkRouter.get('/passport/auth/facebook', passport.authenticate('facebook'));
socialLinkRouter.get('/passport/auth/facebook/callback',
  passport.authenticate('facebook', { successMessage:'IT WORKS!', failureMessage: 'IT DOESNT WORK!'}));

// // Linkedin Route (also docs)
socialLinkRouter.get('/passport/auth/linkedin', passport.authenticate('linkedin'));
socialLinkRouter.get('/passport/auth/linkedin/callback',
  passport.authenticate('linkedin', { successMessage: 'IT WORKS!', failureMessage: 'IT DOESNT WORK!' }));

module.exports = socialLinkRouter;