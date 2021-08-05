/** MVP **/

// Independent
const seedUsersData = require('./seed-users');

// Independent
const seedBrandsData = require('./seed-brands');
const seedTypesData = require('./seed-types');

// LUCIOWARE NOTE: Might change later dependency direction?
const seedCareStatsData = require('./seed-care_stats');
const seedCombatStatsData = require('./seed-combat_stats');

// Dependent on Brand, Type, CareStats, CombatStats
const seedCreaturesData = require('./seed-creatures');

/** LUCIOWARE TODO: FEATURES **/
// const seedItems = require('./seed-items');
// const seedInventory = require('./seed-inventory');

const {
  User,

  Brand,
  Type,

  CareStats,
  CombatStats,

  Creature,
} = require('../models');


const sequelize = require('../config/connection');

const seedSampleDB = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(seedUsersData);
  console.log('1) Users planted\n');
  
  await Brand.bulkCreate(seedBrandsData);
  console.log('2-A) Brands planted\n');
  try {
    await Type.bulkCreate(seedTypesData);
    console.log('2-B) Types planted\n');
  } catch (error) {
    console.log(error);
  }

  await CareStats.bulkCreate(seedCareStatsData);
  console.log('3-A) Care stats planted\n');
  
  await CombatStats.bulkCreate(seedCombatStatsData);
  console.log('3-B) Combat stats planted\n');

  await Creature.bulkCreate(seedCreaturesData);
  console.log('4) Creatures planted\n');

  // await seedItems();
  // console.log('Items planted\n');
  
  // await seedInventory();
  // console.log('Inventory planted\n');

  console.log('\n---- ALL SEEDS PLANTED ----\n');
  process.exit(0);

};

seedSampleDB();
