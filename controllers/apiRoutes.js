const apiRouter = require('express').Router();
const {User} = require("../models");

apiRouter.get('/users',async (req,res) => {
    try{
        const users = await User.findAll();
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

apiRouter.get('/user/:id',async (req,res) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
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

apiRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

apiRouter.delete('/',(req,res) => {
    res.send('Message from delete');
});

module.exports = apiRouter;