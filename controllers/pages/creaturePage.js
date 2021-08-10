/** ROUTER INCLUSION */
const router = require("express").Router();

const CreatureBuilder = require("../../helper/CreatureBuilder");
/** MODEL INCLUSION **/
const { Creature, Brand, CareStats, CombatStats } = require("../../models");

router.get("/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const singleCreature = await Creature.findOne({
        include: [Brand, CareStats],
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });

      if (singleCreature != null) {
        const myCreature = singleCreature.get({ plain: true });

        const handleObj = {
          user: req.session.logged_in,
          userId: req.session.user_id,
          username: req.session.username,
          myCreature,
        };

        res.render("creaturePage", handleObj);
      } else {
        // That creature was not matching
        console.log(
          "User tried to access a Creature that didn't belong to them"
        );
        res.status(300).redirect("/");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(300).redirect("/");
  }
});

router.get("/care/:id", async (req, res) => {
    console.log("\nGetting Care Stats\n");
  if (req.session.logged_in) {
    try {
      const creatUpdate = await Creature.findOne({
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });
      if (creatUpdate) {
        const statUpdate = await CareStats.findOne(req.body, {
          where: { id: creatUpdate.carestatId },
        });
        res.status(200).json(statUpdate);
      } else {
        console.log("They don't own this creature");
        res
          .status(404)
          .json({ message: false, description: "User does not own creature" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something happened on our end");
    }
  } else {
    console.log("User has not logged in");
    res.status(404).send("User is not logged in");
  }
});

router.get("/combat/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const creatUpdate = await Creature.findOne({
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });
      if (creatUpdate) {
        const statUpdate = await CombatStats.findOne(req.body, {
          where: { id: creatUpdate.combatstatId },
        });
        res.status(200).json(statUpdate);
      } else {
        console.log("They don't own this creature");
        res
          .status(404)
          .json({ message: false, description: "User does not own creature" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something happened on our end");
    }
  } else {
    console.log("User has not logged in");
    res.status(404).send("User is not logged in");
  }
});

router.post("/create", async (req, res) => {
  try {
    const creatureBuilt = CreatureBuilder(req.session.user_id,req.body);
    if (creatureBuilt) {
      res.status(200).json({message:true,});
    } else {
      res
        .status(404)
        .json({ message: false, description: "Could not create that monster" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/name/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const creatUpdate = await Creature.update({name: req.body.name,},{
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });
      if (creatUpdate) {
        res.status(200).json({message:true,});
      } else {
        console.log("They don't own this creature");
        res
          .status(404)
          .json({ message: false, description: "Could not find that creature" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({message: false, description: "Something happened on our end"});
    }
  } else {
    console.log("User has not logged in");
    res.status(404).send({message: false, description: "Something happened on our end"});
  }
});

router.put("/combat/:id", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const creatUpdate = await Creature.findOne({
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });
      if (creatUpdate) {
        const statUpdate = await CombatStats.update(req.body, {
          where: { id: creatUpdate.carestatId },
        });
        res.status(200).json(statUpdate);
      } else {
        console.log("They don't own this creature");
        res
          .status(404)
          .json({ message: false, description: "User does not own creature" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something happened on our end");
    }
  } else {
    console.log("User has not logged in");
    res.status(404).send("User is not logged in");
  }
});

router.put("/care/:id", async (req, res) => {
    console.log("\Updating Care Stats\n");
  if (req.session.logged_in) {
    console.log(req.body);
    try {
      const creatUpdate = await Creature.findOne({
        where: {
          user_id: req.session.user_id,
          id: req.params.id,
        },
      });

      if (creatUpdate) {
        const statUpdate = await CareStats.update(req.body, {
          where: { id: creatUpdate.carestatId },
        });
        res.status(200).json({message: true, description: statUpdate});
      } else {
        console.log("They don't own this creature");
        res
          .status(404)
          .json({ message: false, description: "User does not own creature" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something happened on our end");
    }
  } else {
    console.log("User has not logged in");
    res.status(404).send("User is not logged in");
  }
});

module.exports = router;
