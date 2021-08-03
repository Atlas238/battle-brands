const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.get('/', async (req, res) => {
    res.render("homepage");
  });

module.exports = router;