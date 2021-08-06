/** ROUTER INCLUSION */
const router = require("express").Router();

/** MODEL INCLUSION **/
const {Creature, Brand} = require("../../models");

router.get("/profile", async (req,res) => {    
    if(req.session.logged_in){
        try {
            const creatureList = await Creature.findAll({
                include: Brand,
                where: {
                    user_id : req.session.user_id,
                }
            });

            if(creatureList != null){
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

  module.exports = router;