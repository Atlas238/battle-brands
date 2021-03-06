const express = require('express');
const sequelize = require("./config/connection");
const passport = require('passport');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const allRoutes = require('./controllers');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport init...
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static('public'));

const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    helpers: require('./config/handlebars-helpers')
});

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

app.use(allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});