const allApiRoutes = require('express').Router();
const userRoutes = require('./userRoutes');
const creatureRoutes = require('./creatureRoutes');

allApiRoutes.use(userRoutes);
allApiRoutes.use(creatureRoutes);

module.exports = allApiRoutes;