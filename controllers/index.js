/** ROUTER INCLUSION */
const router = require('express').Router();

/** API ROUTES **/
const apiRoutes = require('./api');

/** AUTHENTICATION ROUTES */
const authRoutes = require('./authRoutes');

/** PASSPORT ROUTES (JACK) **/
const socialLinkRoutes = require('./passport/passportRoutes');

/** PAGE ROUTES (creature, profile) **/
const pageRoutes = require('./pages');

/** STANDARD NAV ROUTES (Home, About, Privacy, 404) **/
const homeRoutes = require('./homeRoutes');

/** USE THE ROUTES **/
router.use("/api",apiRoutes);
router.use("/user",authRoutes);
router.use(pageRoutes);
router.use(socialLinkRoutes);
router.use(homeRoutes);

module.exports = router;