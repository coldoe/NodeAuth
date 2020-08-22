//Models
const User = require("../model/User");
//Validation
const {
  registerValidation,
  loginValidation,
} = require("../validation/UserValidation");
//Libraries
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Building API
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (doesExist) return res.status(400).send("You cant register");

  const salt = await bcrypt.genSalt(13);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  try {
    await user.save();
    res.send("Succesful register");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Something wrong with email or pass");
  }

  let sub = new Date(user.date);
  let today = new Date();

  if (sub < today) {
    return res
      .status(403)
      .send("Your subscription is not valid anymore, Forbidden");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Something wrong with email or pass");
  }
  const token = jwt.sign(
    {
      _id: user.id,
      username: user.name,
      subscription: user.date,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
  );
  res.header("auth-token", token).json({ token: token });
});

module.exports = router;
