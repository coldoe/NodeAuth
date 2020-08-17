//Models
const User = require("../model/User");
const { restart } = require("nodemon");

const router = require("express").Router();

//validation
const Joi = require("joi");
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    restart.status(400).send(err);
  }
});

module.exports = router;
