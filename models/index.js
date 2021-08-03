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
Creature.hasOne(Brand, {
    onDelete: 'CASCADE',
});
Brand.belongsToMany(Creature, {
    foreignKey: 'brand_id',
    onDelete: "SET NULL",
});


// Brand has one Type
// Type belongs to many Brand
Brand.hasOne(Type);
Type.belongsToMany(Brand, {
    foreignKey: 'type_id',
    onDelete: "SET NULL",
});


// Creature has one CareStats
// CareStats belongs to one Creature
Creature.hasOne(CareStats, {
    onDelete: 'CASCADE',
});
CareStats.hasOne(Creature,{
    foreignKey: 'care_stats',
    onDelete: 'SET NULL',
});


// Creature has one CombatStats
// CombatStats belongs to one Creature
Creature.hasOne(CombatStats, {
    onDelete: 'CASCADE',
});
CombatStats.hasOne(Creature,{
    foreignKey: 'combat_stats',
    onDelete: 'SET NULL',
});


// Creature has one Type through Brand
// Type belongs to many Creature through Brand
Creature.hasOne(Type,{
    through: Brand,
});
Type.belongsToMany(Creature,{
    through: Brand,
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
