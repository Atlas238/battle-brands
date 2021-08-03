const apiRouter = require('express').Router();

apiRouter.get('/',(req,res) => {
    res.send('Hello from your server!');
});

apiRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

apiRouter.delete('/',(req,res) => {
    res.send('Message from delete');
});

module.exports = apiRouter;