const homeRouter = require('express').Router();

homeRouter.get('/',(req,res) => {
    if(req.session.logged_in){
        res.redirect("/profile");
    } else {
        res.render("login");
    }
});

homeRouter.get('*',(req,res) => {
    res.status(404).render('pageNotFound',{layout:'404'});
});

module.exports = homeRouter;