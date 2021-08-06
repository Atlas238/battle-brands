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
        res.status(300).redirect('/');
    }
});

router.post('/creature/create', async (req,res) => {
    try {
        const newCreature = await Creature.create(req.body);
        if(newCreature){
            res.status(200).json({message: true,});
        } else {
            res.status(404).json({message: false,description:"Could not create that monster"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/creature/:id', async (req,res) => {
    if(req.session.logged_in){
        try {
            const creatUpdate = await Creature.findOne({ 
                where: { 
                    user_id: req.session.user_id,
                    id: req.params.id,
                } 
            });
            if(creatUpdate){
                const statUpdate = await CareStats.update(req.body,{where:{id:creatUpdate.carestatId,}});
                res.status(200).json(statUpdate);
            } else {
                console.log("They don't own this creature");
                res.status(404).json({message:false,description:"User does not own creature"});
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something happened on our end");
        }
    } else {
        console.log('User has not logged in');
        res.status(404).send("User is not logged in");
    }
});

router.put('creature/combat/:id', async (req,res) => {
    if(req.session.logged_in){
        try {
            const creature = await Creature.findOne({where: {id: req.params.id}});

            res.status(200).json(creatUpdate);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something happened on our end");
        }
} else {
    console.log('User has not logged in');
    res.status(404).send("User is not logged in");
}
});

router.put('creature/care/:id', async (req,res) => {
    if(req.session.logged_in){
        try {
            const creatUpdate = await Creature.update(req.body,{where: {id: req.params.id,user_id: req.session.user_id,}});
            res.status(200).json(creatUpdate);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something happened on our end");
        }
    } else {
        console.log('User has not logged in');
        res.status(404).send("User is not logged in");
    }
});

module.exports = router;