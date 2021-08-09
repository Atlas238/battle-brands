// Requirements...
const socialLinkRouter = require('express').Router();
const CreatureBuilder = require('../../helper/CreatureBuilder');
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const passportLinkedIn = require('passport-linkedin-oauth2');

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

            console.log('You made it!');
            let newCreature = {
                // LinkedIn BrandID
                brand_id: 38,
                type_id: 7,
            };

            try {
                const fbAdded = await CreatureBuilder(req.session.user_id,newCreature);
                if(fbAdded){
                    req.session.connectedFacebook=true;
                    res.status(200).redirect('/profile');
                } else {
                    req.session.connectedFacebook=false;
                    console.log("Creature Not Created");
                    res.status(404).json({message:false,description: 'Creature was not created'});
                }
                res.status(200).redirect('/profile');
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
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
                // LinkedIn BrandID
                brand_id: 40,
                type_id: 7,
            };

            try {
                const linkedInAdded = await CreatureBuilder(req.session.user_id,newCreature);
                if(linkedInAdded){
                    req.session.connectedLinkedin=true;
                    res.status(200).redirect('/profile');
                } else {
                    req.session.connectedLinkedin=false;
                    console.log("Creature Not Created");
                    res.status(404).json({message:false,description: 'Creature was not created'});
                }
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            };
        };

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
  });

module.exports = socialLinkRouter;