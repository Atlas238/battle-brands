const homeRouter = require('express').Router();

homeRouter.get('/about-us', async (req,res) => {
    if(req.session){
        res.render('about',{user:req.session.logged_in,});
    } else{
        res.render('about',{user:false,});
    }
});

homeRouter.get('/',(req,res) => {
    if(req.session.logged_in){
        res.redirect("/user/profile");
    } else {
        res.render("login");
    }
});

homeRouter.get('*',(req,res) => {
    res.status(404).render('pageNotFound',{layout:'404'});
});

module.exports = homeRouter;