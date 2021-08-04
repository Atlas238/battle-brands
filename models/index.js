/** IMPORT MODELS **/
// LUCIOWARE TODO:
const User = require('./_User');
const Creature = require('./_Creature');
const Brand = require('./_Brand');
const Type = require('./_Type');
const CareStats = require('./_CareStats');
const CombatStats = require('./_CombatStats');


// User has MANY Creature
// Creature belongs to ONE User
User.hasMany(Creature);
Creature.belongsTo(User);


// Creature has ONE Brand
// Brand has MANY Creature
Creature.hasOne(Brand);
Brand.belongsTo(Creature);


// Creature has ONE Type (Type and Brand are separate)
// Type has MANY Creature
Creature.hasOne(Type);
Type.belongsTo(Creature);


// Creature has ONE CareStats
// CareStats belongs to ONE Creature
Creature.hasOne(CareStats);
CareStats.belongsTo(Creature);


// Creature has ONE CombatStats
// CombatStats belongs to ONE Creature
Creature.hasOne(CombatStats);
CombatStats.belongsTo(Creature);


// Types can pull from many Types as Weaknesses?
Type.hasMany(Type, {
    as: 'weakness'
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
