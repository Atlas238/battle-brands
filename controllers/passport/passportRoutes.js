// Requirements...
const socialLinkRouter = require('express').Router();
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLinkedIn = require('passport-linkedin-oauth2');
const { Creature } = require('../../models');
// const passportTwitter = require('passport-twitter');

// PASSPORT-FACEBOOK SETUP
const FacebookStrategy = passportFacebook.Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://battle-brands.herokuapp.com/passport/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

// LINKEDIN SETUP
const LinkedInStrategy = passportLinkedIn.Strategy;
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "https://battle-brands.herokuapp.com/passport/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    });
}));

// // TWITTER SETUP
// const TwitterStrategy = passportTwitter.Strategy;
// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://battle-brands.herokuapp.com/passport/auth/twitter/callback"
// },
// function(token, tokenSecret, profile, cb) {
//     return cb(null, profile);
// }));

// // User Serialize Setps...
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// ROUTES
// Facebook Routes
socialLinkRouter.get('/passport/auth/facebook', passport.authenticate('facebook'));
socialLinkRouter.get('/passport/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/create'}), async (req, res) => {
      console.log(req);
    //   CREATE FACEBOOK CREATURE FOR USER WITH GIVEN ID
    try {
        if (req.user) {
            console.log(`HEY LOOK AT ME IM USER ${req.session.user_id}`);
            let newCreature = {
                id: 'DEFAULT',
                user_id: req.session.user_id,
                name: `newPet${req.session.user_id}`,
                // FB BrandID
                brand_id: 2,
                type_id: 2,
                combatstat_id: 3,
                carestat_id: 1,
                exp: 0,
                currenthealth: 10,
            };

            let testCreature = {
                user_id: 3,
                name: `newPet3`,
                // FB BrandID
                brand_id: 2,
                type_id: 2,
                combatstat_id: 3,
                carestat_id: 1,
                exp: 0,
                currenthealth: 10,
            }

            try {
                const creature = await Creature.create(newCreature);
                console.log(creature);
                res.status(200).send(creature);
            } catch (error) {
                res.status(500).json(error);
                console.log(error);
            }
        };
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
  });

// // Linkedin Route
socialLinkRouter.get('/passport/auth/linkedin', passport.authenticate('linkedin'));
socialLinkRouter.get('/passport/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }), async (req, res) => {
    // CREATE LINKEDIN CREATURE FOR USER WITH GIVEN ID
    console.log(req);
    try {
        if (req.user) {
            console.log('You made it!');
            let newCreature = {
                user_id: req.session.user_id,
                name: `newPet${req.session.user_id}`,
                // FB BrandID
                brand_id: 3,
                type_id: 2,
                combatstat_id: 4,
                carestat_id: 2,
                exp: 0,
                currenthealth: 10,
            };

            try {
                const creature = await Creature.create(newCreature);
                console.log(creature);
                res.status(200).send(creature);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
  });

// // Twitter Route
socialLinkRouter.get('/passport/auth/twitter', passport.authenticate('twitter'));
// Callback
socialLinkRouter.get('/passport/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }), async (req, res) => {

    console.log(req);

    try {

        if (req.user) {
            console.log('You made it!');
            let newCreature = {
                user_id: req.session.user_id,
                name: `newPet${req.session.user_id}`,
                // FB BrandID
                brand_id: 3,
                type_id: 2,
                combatstat_id: 4,
                carestat_id: 2,
                exp: 0,
                currenthealth: 10,
            };

            try {
                const creature = await Creature.create(newCreature);
                console.log(creature);
                res.status(200).send(creature);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };

  });

module.exports = socialLinkRouter;