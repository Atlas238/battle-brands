const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

router.use("/user",userRoutes);
router.use("/api",apiRoutes);
router.use(homeRoutes);

  router.get('/login', async (req, res) => {
    res.render("login",{
        name:"test",
    });
  }); 
module.exports = router;