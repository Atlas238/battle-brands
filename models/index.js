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
User.hasMany(Creature, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
Creature.belongsTo(User, {
    sourceKey: 'user_id',
    foreignKey: 'id',
});


// Creature has ONE Brand
// Brand has MANY Creature
Creature.hasOne(Brand, {
    sourceKey: 'brand_id',
    foreignKey: 'id',
    onDelete: 'CASCADE',
});
Brand.hasMany(Creature, {
    sourceKey: 'id',
    foreignKey: 'brand_id',
    onDelete: 'SET NULL',
});


// Creature has ONE Type (Type and Brand are separate)
// Type has MANY Creature
Creature.hasOne(Type, {
    sourceKey: 'type_id',
    foreignKey: 'id',
    onDelete: 'CASCADE',
});
Type.hasMany(Creature, {
    sourceKey: 'id',
    foreignKey: 'type_id',
    onDelete: 'SET NULL',
});


// Creature has ONE CareStats
// CareStats belongs to ONE Creature
Creature.hasOne(CareStats, {
    sourceKey: 'care_stats',
    foreignKey: 'id',
    onDelete: 'CASCADE',
});
CareStats.belongsTo(Creature, {
    sourceKey: 'id',
    foreignKey: 'care_stats',
    onDelete: 'SET NULL',
});


// Creature has ONE CombatStats
// CombatStats belongs to ONE Creature
Creature.hasOne(CombatStats, {
    sourceKey: 'combat_stats',
    foreignKey: 'id',
    onDelete: 'CASCADE',
});
CombatStats.belongsTo(Creature, {
    sourceKey: 'id',
    foreignKey: 'combat_stats',
    onDelete: 'SET NULL',
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
