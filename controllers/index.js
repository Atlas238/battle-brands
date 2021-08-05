const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const frontEndRoutes = require('./frontEndRoutes');

// const authRoutes = require('./authRoutes');
// const homeRoutes = require('./homeRoutes');
// const { route } = require('./authRoutes');

router.use("/api",apiRoutes);
router.use(frontEndRoutes);

// router.use("/user",authRoutes);
//router.use(homeRoutes);

module.exports = router;