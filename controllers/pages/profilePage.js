/** ROUTER INCLUSION */
const router = require("express").Router();

const CreatureBuilder = require("../../helper/CreatureBuilder");
/** MODEL INCLUSION **/
const {Creature, Brand, CareStats} = require("../../models");

router.get("/profile", async (req,res) => {
    if(req.session.logged_in){
        try {
            const creatureList = await Creature.findAll({
                include: [Brand, CareStats],
                where: {
                    user_id : req.session.user_id,
                }
            });

            if(creatureList){
                const userCreatures = creatureList.map(creature=>{
                    return creature.get({plain:true});
                });

                console.log(userCreatures);
                const handleObj = {
                    user: req.session.logged_in,
                    username: req.session.username,
                    userCreatures,
                }
                res.render("profilePage", handleObj );
            }
            else {
                res.status(404).send("You don't have any creatures");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    else {
      res.status(300).redirect('/');
    }
  });

//   ADDING IN CREATE PAGE RENDER - NO DATA NEEDED
  router.get('/create', async (req, res) => {
      if (req.session.logged_in) {
          try {
              res.render('createPage');
          } catch (err) {
              console.log(err);
              res.status(500).json(err);
          }
      }
  });

  router.get('/create/build-it', async (req,res) => {
      try {
        let tempCreature = {
            user_id: req.session.user_id,
            name: `newPet${req.session.user_id}`,
            // FB BrandID
            brand_id: 2,
            type_id: 2,
            combatstat_id: 3,
            carestat_id: 1,
            exp: 0,
            currenthealth: 10,
        };
          const newCreature = await CreatureBuilder(tempCreature);
          if(newCreature){
              res.status(200).send("All Good");
          } else {
            res.status(404).send("Not Good");
          }
      } catch (error) {
          
      }
  });

  module.exports = router;