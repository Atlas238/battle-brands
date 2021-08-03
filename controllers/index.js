const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

// router.use("/user",userRoutes);
// router.use("/api",apiRoutes);

router.get('/', async (req, res) => {
    res.render("homepage",{
        name:"Derek",
    });
  });

const apiRoutes = require('./api');
const homeRoutes = require('./home');
const authRoutes = require('./passport/passport-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/auth/', authRoutes);

module.exports = router;