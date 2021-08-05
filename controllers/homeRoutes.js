const router = require('express').Router();

/** LANDING PAGE **/
router.get('/',(req,res) => {
    if(req.session.logged_in){
        res.redirect("/profile");
    } else {
        res.render("login");
    }
});

/** ABOUT PAGE **/
router.get('/about', async (req,res) => {
    if(req.session){
        res.render('about',{user:req.session.logged_in,});
    } else{
        res.render('about',{user:false,});
    }
});

/** LUCIOWARE TODO: PRIVACY POLICY **/
router.get('/privacy', async (req,res) => {
    if(req.session){
        res.render('privacy',{user:req.session.logged_in,});
    } else{
        res.render('privacy',{user:false,});
    }
});

/** 404 PAGE **/
router.get('*',(req,res) => {
    if(req.session){
        res.render('pageNotFound',{layout:'404', user:req.session.logged_in,});
    } else{
        res.render('pageNotFound',{layout:'404', user:false,});
    }
});


module.exports = router;