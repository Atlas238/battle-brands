const express = require('express');
const sequelize = require("./config/connection")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const allRoutes = require('./controllers');
const passportfb = require('passport-facebook');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

const exphbs = require('express-handlebars');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*2,
        sameSite: 'Lax',
    },
    store: new SequelizeStore({
        db: sequelize,
      })
}))

// FB Link Set-up...
passportfb.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
}   
));

app.use(allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});