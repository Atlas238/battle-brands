/** MVP **/
const seedUsers = require('./seed-users');
const seedBrands = require('./seed-brands');
const seedCreatures = require('./seed-creatures');
const seedTypes = require('./seed-types');
const seedCarestats = require('./seed-carestats');

/** FEATURE **/
// const seedItems = require('./seed-items');
// const seedInventory = require('./seed-inventory');
// const seedCombatstats = require('./seed-combat');

const sequelize = require('../config/connection');

const seedSampleDB = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('Users planted\n');
  
  await seedBrands();
  console.log('Brands planted\n');
  
  await seedCreatures();
  console.log('Creatures planted\n');
  
  await seedTypes();
  console.log('Types planted\n');
  
  await seedCarestats();
  console.log('Care stats planted\n');
  
  // await seedItems();
  // console.log('Items planted\n');
  
  // await seedInventory();
  // console.log('Inventory planted\n');
  
  // await seedCombatstats();
  // console.log('Combat stats planted\n');

  console.log('\n---- ALL SEEDS PLANTED ----\n');
  process.exit(0);

};

seedSampleDB();
