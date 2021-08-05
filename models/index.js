/** IMPORT MODELS **/
const User = require('./User');
const Creature = require('./Creature');
const Brand = require('./Brand');
const Type = require('./Type');
const CareStats = require('./CareStats');
const CombatStats = require('./CombatStats');


// User <--> Creature
User.hasMany(Creature);
Creature.belongsTo(User);


// Creature <--> Brand
Creature.belongsTo(Brand);
Brand.hasMany(Creature);


// Creature <--> Type
Creature.belongsTo(Type);
Type.hasMany(Creature);


// Creature <--> CareStat
Creature.belongsTo(CareStats);
CareStats.hasOne(Creature);


// Creature <--> CombatStats
Creature.belongsTo(CombatStats);
CombatStats.hasOne(Creature);


// Types <--> Types as Weaknesses
Type.hasMany(Type, {
    as: 'weakness_id',
    // foreignKey: "weakness",
    useJunctionTable: false,
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
});


// LUCIOWARE TODO: INVENTORY!


// Export
module.exports = {
  User,
  Creature,
  Brand,
  Type,
  CareStats,
  CombatStats,
};
