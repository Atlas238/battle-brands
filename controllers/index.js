const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.use("/user",userRoutes);
router.use("/api",apiRoutes);

router.get('/', async (req, res) => {
    res.render("homepage");
  });

module.exports = router;