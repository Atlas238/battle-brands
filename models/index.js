/** IMPORT MODELS **/
// LUCIOWARE TODO:
const User = require('./_User');
const Creature = require('./_Creature');
const Brand = require('./_BaseStats');
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
