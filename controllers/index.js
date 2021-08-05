const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const authRoutes = require('./authRoutes');
const frontEndRoutes = require('./frontEndRoutes');
const socialLinkRoutes = require('./passport/passportRoutes');
const homeRoutes = require('./homeRoutes');

router.use("/api",apiRoutes);
router.use("/user",authRoutes);
router.use(frontEndRoutes);
// Passport Router
router.use(socialLinkRoutes);
router.use(homeRoutes);

module.exports = router;