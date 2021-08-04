const router = require("express").Router();
const {User} = require("../models");
const testData = require('../seeds/test-data.json');

router.get("/profile", async (req,res) => {
  if(req.session.logged_in){
    res.status(200).render('profile',testData);
  } else {
    res.status(300).render('login');
  }
});

router.get("/pet-page", async (req,res) => {
  if(req.session.logged_in){
    res.status(200).render('petPage');
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
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
      req.session.logged_in = true;

      res.json({message: true,});
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
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
      req.session.logged_in = true;

      res.status(200).render('profile',testData);
    });
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
