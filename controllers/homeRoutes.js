const homeRouter = require('express').Router();

homeRouter.get('/',(req,res) => {
    if(req.session.logged_in){
        res.redirect("/user/profile");
    } else {
        res.render("homepage",{user:false});
    }
});

homeRouter.get('*',(req,res) => {
    res.status(404).send("Page Does Not Exist");
});

module.exports = homeRouter;