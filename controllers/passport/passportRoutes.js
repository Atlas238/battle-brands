const socialLinkRouter = require('express').Router();
const passport = require('passport');
const { User } = require('../../models');

// PASSPORT-FACEBOOK SETUP
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
}   
));

// PASSPORT-TWITTER SETUP
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3001/auth/twitter/callback"
}, function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}
));

// LINKEDIN SETUP
passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_API_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:3001/auth/linkedin/callback"
}, function(token, tokenSecret, profile, done) {
      User.findOrCreate({ linkedinId: profile.id }, function(err, user) {
          return done(err, user);
      });
}
));

// FB Route (Following example format from docs --- they store FB auth data for login purposes, dont necessarily need to add anything to db and then wouldnt need federated route)
socialLinkRouter.get('/login/federated/www.facebook.com', passport.authenticate('facebok'));
socialLinkRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { assignProperty: 'federatedUser', failureRedirect: '/login'}),
  function(req, res, next) {
        // do something (or nothing) with response? Then Add Creature To User
        // TODO: Creature Add
        res.redirect('/profile');
  }
);

// Twitter Route (also from docs)
socialLinkRouter.get('/login/federated/www.twitter.com', passport.authenticate('twitter'));
socialLinkRouter.get('/auth/twitter/callback', 
passport.authenticate('twitter', { failureRedirect: '/login' }),
function(req, res) {
    // Successful, go to profile
    // TODO: Creature Add
    res.redirect('/profile');
});

// Linkedin Route (also docs)
socialLinkRouter.get('/login/federated/www.linkedin.com', passport.authenticate('linkedin'));
socialLinkRouter.get('/auth/linkedin/callback',
passport.authenticate('linkedin', { failureRedirect: '/login' }),
function(req, res) {
    // Successful, go to profile
    // TODO: Creature Add
    res.redirect('/profile');
})

module.exports = socialAuthRouter;