const userRouter = require('express').Router();

userRouter.get('/',(req,res) => {
    res.send('Hello from your server!');
});

userRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

userRouter.delete('/',(req,res) => {
    res.send('Message from delete');
});

module.exports = userRouter;