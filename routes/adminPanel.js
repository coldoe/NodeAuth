//Models
const User = require("../model/User");
//Libraries
const router = require("express").Router();
//MYJS
const verifyAdmin = require("../middleware/verifyThatRoleIsAdmin");

router.get("/adminPanel", verifyAdmin, async (req, res) => {
  //select date,role,name,email from User u where u.role not in ("admin")
  let users = await User.find(
    { role: { $ne: "admin" } },
    { date: 1, role: 1, name: 1, email: 1 }
  );
  if (!users) {
    return res.status(500).send("none users from db");
  }
  return res.status(200).send(users);
});

module.exports = router;
