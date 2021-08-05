// Requirements...
const socialLinkRouter = require('express').Router();
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLinkedIn = require('passport-linkedin-oauth2');
// const passportTwitter = require('passport-twitter');

// PASSPORT-FACEBOOK SETUP
const FacebookStrategy = passportFacebook.Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://battle-brands.herokuapp.com/passport/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
// LINKEDIN SETUP
const LinkedInStrategy = passportLinkedIn.Strategy;
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "http://battle-brands.herokuapp.com/passport/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    });
}));
<<<<<<< HEAD
// TWITTER SETUP
=======
// // TWITTER SETUP
>>>>>>> develop
// const TwitterStrategy = passportTwitter.Strategy;
// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://battle-brands.herokuapp.com/passport/auth/twitter/callback"
// },
// function(token, tokenSecret, profile, cb) {
//     return cb(null, profile);
// }));

// User Serialize Setps...
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// ROUTES

// Facebook Routes
socialLinkRouter.get('/passport/auth/facebook', passport.authenticate('facebook'));
// Callback
socialLinkRouter.get('/passport/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect:'/profile', failureRedirect: '/login'}));

// // Linkedin Route
socialLinkRouter.get('/passport/auth/linkedin', passport.authenticate('linkedin'));
// Callback
socialLinkRouter.get('/passport/auth/linkedin/callback',
  passport.authenticate('linkedin', { successRedirect: '/profile', failureRedirect: '/login' }));

// // Twitter Route
// socialLinkRouter.get('/passport/auth/twitter', passport.authenticate('twitter'));
// // Callback
// socialLinkRouter.get('/passport/auth/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/login', successRedirect: '/profile'}));

module.exports = socialLinkRouter;