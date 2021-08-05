const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const authRoutes = require('./authRoutes');
const frontEndRoutes = require('./frontEndRoutes');
const homeRoutes = require('./homeRoutes');
const { route } = require('./authRoutes');

router.use("/api",apiRoutes);
router.use("/user",authRoutes);
router.use(frontEndRoutes);
router.use(homeRoutes);

module.exports = router;