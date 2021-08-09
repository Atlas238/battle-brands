const { CareStats, CombatStats, Creature } = require("../models");
const firstNames = require('./firstNames.json');
const secondNames = require('./secondName.json');

const CreatureBuilder = async (userId,queryObj) => {
  try {
    const newCare = await CareStats.create({
      happiness: 2,
      hunger: 2,
      grooming: 2,
      energy: 2,
    });
    const newCombat = await CombatStats.create({
      hp: 8 + Math.floor(Math.random() * 12),
      atk: 1,
      def: 3,
    });

    const creatureObject = {
      user_id: userId,
      name: getRandomName(),
      brand_id: queryObj.brand_id,
      type_id: queryObj.type_id,
      combatstat_id: newCombat.id,
      carestat_id: newCare.id,
      exp: 0,
      currenthealth: newCombat.hp,
      userId: userId,
      carestatId: newCare.id,
      combatstatId: newCombat.id,
    };

    const newCreature = await Creature.create(creatureObject);
    if(newCreature){
        return true;
    } else {
        return false;
    }
  } catch (error) {
      throw error;
  }
};

const getRandomName = () => {
  const randIdx1 = Math.floor(Math.random() * firstNames.length);
  const randIdx2 = Math.floor(Math.random() * secondNames.length);
  let firstName = firstNames[randIdx1].split('');
  firstName[0] = firstName[0].toUpperCase();
  return `${firstName.join('')} ${secondNames[randIdx2]}`;
}

module.exports = CreatureBuilder;