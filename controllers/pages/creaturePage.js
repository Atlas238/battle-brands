/** ROUTER INCLUSION */
const router = require('express').Router();

/** MODEL INCLUSION **/
const { Creature, Brand, CareStats } = require("../../models");


router.get("/creature/:id", async (req,res) => {

    if(req.session.logged_in){
        // res.status(200).render('creature');

        // if(req.params.id){
        
        // }

        try{

            const singleCreature = await Creature.findOne({
                include:[ Brand, CareStats],
                where: {
                    user_id : req.session.user_id,
                    id: req.params.id
                },
            });
            
            if(singleCreature != null){

                const myCreature = singleCreature.get({plain:true});
                console.log(myCreature);

                const handleObj = {
                    user: req.session.logged_in,
                    username: req.session.username,
                    myCreature,
                }

                res.render("creaturePage", handleObj );
            }
            else{
                // That creature was not matching
                console.log("User tried to access a Creature that didn't belong to them");
                res.status(300).redirect('/');
            }

        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
    else {
        res.status(300).redirect('/profile');
    }
});

module.exports = router;