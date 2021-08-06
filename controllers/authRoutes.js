const router = require("express").Router();
const {User} = require("../models");
const testData = require('../seeds/test-data.json');

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
        .json({ message: false, description:"Incorrect email or password, please try again" });
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
    req.session.logged_in = false;
    req.session.email = '';
    req.session.username = '';
    req.session.password = '';
    res.status(200).json({message: true,});
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if(userData){
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        testData.username = req.session.username;

        res.status(200).json({message: true,});
      });
    } else {
      res.status(404).json({message: false, description:"Invalid data in the input fields"});
    }
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
