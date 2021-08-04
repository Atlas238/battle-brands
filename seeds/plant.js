/** MVP **/
const seedUsersData = require('./seed-users');
const seedBrandsData = require('./seed-base_stats');
const seedCreaturesData = require('./seed-creatures');
const seedTypesData = require('./seed-types');
const seedCareStatsData = require('./seed-care_stats');
const seedCombatStatsData = require('./seed-combat_stats');

/** LUCIOWARE TODO: FEATURES **/
// const seedItems = require('./seed-items');
// const seedInventory = require('./seed-inventory');

const {
  User,
  Creature,
  BaseStats,
  Type,
  CareStats,
  CombatStats,
} = require('../models');


const sequelize = require('../config/connection');

const seedSampleDB = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(seedUsersData);
  console.log('Users planted\n');
  
  await Creature.bulkCreate(seedCreaturesData);
  console.log('Creatures planted\n');

  await BaseStats.bulkCreate(seedBrandsData);
  console.log('Brands planted\n');
  
  await Type.bulkCreate(seedTypesData);
  console.log('Types planted\n');
  
  await CareStats.bulkCreate(seedCareStatsData);
  console.log('Care stats planted\n');
  
  await CombatStats.bulkCreate(seedCombatStatsData);
  console.log('Combat stats planted\n');
  
  // await seedItems();
  // console.log('Items planted\n');
  
  // await seedInventory();
  // console.log('Inventory planted\n');

  console.log('\n---- ALL SEEDS PLANTED ----\n');
  process.exit(0);

};

seedSampleDB();
