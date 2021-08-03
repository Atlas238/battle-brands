/** IMPORT MODELS **/
// LUCIOWARE TODO:
const User = require('./_User');
const Creature = require('./_Creature');
const Brand = require('./_Brand');
const Type = require('./_Type');
const CareStats = require('./_CareStats');
const CombatStats = require('./_CombatStats');

// User has many Creature
// Creature belongs to User
User.hasMany(Creature,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
Creature.belongsTo(User);


// Creature has one Brand
// Brand belongs to many Creature
Brand.hasMany(Creature, {
    foreignKey: 'brand_id',
    onDelete: "SET NULL",
});

Creature.belongsTo(Brand, {
    onDelete: 'CASCADE',
});

// Brand has one Type
// Type belongs to many Brand
Type.hasMany(Brand, {
    foreignKey: 'type_id',
    onDelete: "SET NULL",
});
Brand.belongsTo(Type);


// Creature has one CareStats
// CareStats belongs to one Creature
CareStats.hasOne(Creature,{
    foreignKey: 'care_stats',
    onDelete: 'SET NULL',
});
Creature.belongsTo(CareStats, {
    onDelete: 'CASCADE',
});


// Creature has one CombatStats
// CombatStats belongs to one Creature
CombatStats.hasOne(Creature,{
    foreignKey: 'combat_stats',
    onDelete: 'SET NULL',
});
Creature.belongsTo(CombatStats, {
    onDelete: 'CASCADE',
});


// Creature has one Type through Brand
// Type belongs to many Creature through Brand
Type.hasMany(Creature);
Creature.belongsTo(Type);


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
