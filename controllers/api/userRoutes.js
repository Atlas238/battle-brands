const userRouter = require('express').Router();
const {User,Creature, CareStats} = require("../../models");

userRouter.get('/users',async (req,res) => {
    try{
        const users = await User.findAll({include: [{model:Creature}],});
        if(users){
            res.status(200).json(users);
        } else {
            res.status(404).send("Could not load those users");
        }
    } catch (err){
        console.error(err);
        res.status(500).send("Could not find that data");
    }
});

userRouter.get('/user/:id',async (req,res) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
            include: [{model:Creature},],
        });
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).send("Could not find that user");
        }
    } catch (err){
        console.error(err);
        res.status(500).send("Whoops something happend on our end!");
    }
});

// Give Creature to user

userRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

userRouter.delete('/',(req,res) => {
    res.send('Message from delete');
});

module.exports = userRouter;