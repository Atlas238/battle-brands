const creatureRouter = require("express").Router();
const { User, Creature, CareStats, CombatStats } = require("../../models");

creatureRouter.get("/creatures", async (req, res) => {
  try {
    const creatureList = await Creature.findAll();
    if (creatureList) {
      res.status(200).json(creatureList);
    } else {
      res.status(404).send("Could not find those creatures");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Issue loading that data");
  }
});

creatureRouter.post("/stats/:userId", async (req, res) => {
  try {
    const creatureList = await Creature.findOne({
      where: {
        user_id: req.params.userId,
      },
      include: [{ model:CareStats},{model:CombatStats}],
    });

    if (creatureList) {
      res.status(200).json(creatureList);
    } else {
      res.status(404).send("Could not find that user's creatures");
    }
  } catch (err) {
      console.log(err);
    res.status(500).send("Issue loading that data");
  }
});

creatureRouter.post("/creature/user/:userId", async (req, res) => {
  try {
    const creatureList = await Creature.findAll({
      where: {
        user_id: req.params.userId,
      },
      include: [{all: true,}],
    });

    if (creatureList) {
      res.status(200).json(creatureList);
    } else {
      res.status(404).send("Could not find that user's creatures");
    }
  } catch (err) {
      console.log(err);
    res.status(500).send("Issue loading that data");
  }
});

creatureRouter.delete("/", (req, res) => {
  res.send("Message from delete");
});

module.exports = creatureRouter;
