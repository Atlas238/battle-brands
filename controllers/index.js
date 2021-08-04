const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

router.use("/user",userRoutes);
router.use("/api",apiRoutes);
router.use(homeRoutes);

module.exports = router;