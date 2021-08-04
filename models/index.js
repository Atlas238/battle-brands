/** IMPORT MODELS **/
// LUCIOWARE TODO:
const User = require('./_User');
const Creature = require('./_Creature');
const BaseStats = require('./_BaseStats');
const Type = require('./_Type');
const CareStats = require('./_CareStats');
const CombatStats = require('./_CombatStats');

// User has many Creature
// Creature belongs to User
User.hasMany(Creature,{
    foreignKey:'user_id',
    onDelete: 'CASCADE',
});

Creature.belongsTo(User,{
    foreignKey:'user_id',
});

Creature.hasOne(BaseStats,{
    foreignKey: 'baseStats_id',
    onDelete: 'SET NULL',
})



// LUCIOWARE TODO: INVENTORY!


// Export
module.exports = {
  User,
  Creature,
  BaseStats,
  Type,
  CareStats,
  CombatStats,
};
