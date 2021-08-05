const router = require("express").Router();
const {User} = require("../models");
const testData = require('../seeds/test-data.json');

router.get("/profile", async (req,res) => {
  if(req.session.logged_in){
    res.render('collectionpage',testData);
  } else {
    res.status(300).redirect('/');
  }
});

router.get("/pet-page", async (req,res) => {
  if(req.session.logged_in){
    res.status(200).render('petPage');
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json({message:true,});
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      testData.username = req.session.username;

      res.status(200).json({message: true,});
    });
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
