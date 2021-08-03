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

  router.get('/login', async (req, res) => {
    res.render("login",{
        name:"test",
    });
  }); 
module.exports = router;