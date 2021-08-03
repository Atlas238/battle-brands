const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home');
const authRoutes = require('./passport/passport-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/auth/', authRoutes);

module.exports = router;