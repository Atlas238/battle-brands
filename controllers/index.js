const router = require('express').Router();
const authRoutes = require('./authRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use("/user",authRoutes);
router.use("/api",apiRoutes);
router.use(homeRoutes);

module.exports = router;