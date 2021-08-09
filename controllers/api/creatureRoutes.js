const creatureRouter = require("express").Router();
const { User, Creature, CareStats, CombatStats, Type, Brand } = require("../../models");

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

// TODO: GOT ERROR 'Unknown column "weakness_id" in "field list"'
creatureRouter.get('/creature/types', async (req,res) => {
  try {
    const typeList = await Type.findAll();
    if(typeList){
      res.status(200).json(typeList);
    } else {
      res.status(404).send("Could not load the types");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Issue loading that data");
  }
});

creatureRouter.get('/creature/brands', async (req,res) => {
  try {
    const brandList = await Brand.findAll();
    if(brandList){
      res.status(200).json(brandList);
    } else {
      res.status(404).send("Could not load the types");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Issue loading that data");
  }
});

creatureRouter.get('/creature',async (req,res) => {
  if(req.query && req.query.user && req.query.creature){
    try {
      const creature = await Creature.findOne({where: { user_id: req.query.user, id: req.query.creature}});
      if(creature){
        res.status(200).json(creature);
      } else {
        res.status(200).json({message: false, description: "The user does not own that creature"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
})

creatureRouter.get("/creature/stats/:userId", async (req, res) => {
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
      include: [{model: User,}],
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

creatureRouter.put('/creature/exp', async (req,res) => {
  if(req.session.logged_in){
    try {
      const creatureUpdate = await Creature.update({
        exp:req.body.amount,
      },
      {
        where:{
          id: req.body.creature_id,
          user_id: req.session.user_id,
        }
      });
      if(creatureUpdate){
        res.status(200).json({message:true,});
      } else {
        res.status(404).json({message:false,description:"Experience not updated"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log("User not Logged In");
    res.status(404).json({message:false,description:"Not Logged In"});
  }
});

creatureRouter.delete("/", (req, res) => {
  res.send("Message from delete");
});

module.exports = creatureRouter;
