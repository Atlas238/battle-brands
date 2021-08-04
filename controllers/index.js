const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.get('/', async (req, res) => {
    res.render("homepage");
  });

  router.get('/login', async (req, res) => {
    res.render("login",{
        name:"test",
    });
  }); 
module.exports = router;