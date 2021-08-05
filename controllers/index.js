/** ROUTER INCLUSION */
const router = require('express').Router();

/** API ROUTES **/
const apiRoutes = require('./api');

/** AUTHENTICATION ROUTES */
const authRoutes = require('./authRoutes');

/** PASSPORT ROUTES (JACK) **/
const socialLinkRoutes = require('./passport/passportRoutes');

/** PROFILE PAGE **/
const profileRoutes = require('./profileRoutes');

/** CREATURE PAGE **/
//const creatureRoutes = require('./creatureRoutes');

/** STANDARD NAV ROUTES (Home, About, Privacy, 404) **/
const homeRoutes = require('./homeRoutes');

/** USE THE ROUTES **/
router.use("/api",apiRoutes);
router.use("/user",authRoutes);
router.use(profileRoutes);
//router.use(creatureRoutes);
router.use(socialLinkRoutes);
router.use(homeRoutes);

module.exports = router;