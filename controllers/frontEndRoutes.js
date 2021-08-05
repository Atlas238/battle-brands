const express = require('express');
const router = express.Router();

const {Creature, Brand} = require("../models");

router.get('/creatures', (req,res)=>{
    // TODO: Auth for current user

    Creature.findAll({
        include: Brand
    })
    .then(creatures=>{
        const userCreatures = creatures.map(creature=>{
            return creature.get({plain:true})
        })
        console.log(userCreatures);
        res.render("collectionpage", {userCreatures} );
    })
})

module.exports = router;