const { CareStats, CombatStats, Creature } = require("../models");

const CreatureBuilder = async (queryObj) => {
  try {
    const newCare = await CareStats.create({
      happiness: 4,
      hunger: 1,
      grooming: 4,
      energy: 4,
    });
    const newCombat = await CombatStats.create({
      hp: 10,
      atk: 1,
      def: 3,
    });
    queryObj.carestat_id = newCare.id;
    queryObj.carestatId = newCare.id;
    queryObj.combatstat_id = newCombat.id;
    queryObj.combatstatId = newCombat.id;

    const newCreature = await Creature.create(queryObj);
    console.log(newCreature);
    if(newCreature){
        return true;
    } else {
        return false;
    }
  } catch (error) {
      throw error;
  }
};

module.exports = CreatureBuilder;