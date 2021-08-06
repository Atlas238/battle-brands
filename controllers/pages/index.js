const router = require('express').Router();
const creaturePage = require('./creaturePage.js');
const profilePage = require('./profilePage.js');

router.use(creaturePage);
router.use(profilePage);

module.exports = router;