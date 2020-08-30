//Models
const User = require("../model/User");
//Libraries
const router = require("express").Router();
//MYJS
const verifyAdmin = require("../middleware/verifyThatRoleIsAdmin");

router.get("/adminPanel", verifyAdmin, async (req, res) => {
  //select date,role,name,email from User u where u.role not in ("admin")
  try {
    let users = await User.find(
      { role: { $ne: "admin" } },
      { date: 1, role: 1, name: 1, email: 1 }
    );
    if (!users) {
      return res.status(500).json("none users from db");
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.patch("/adminPanel/:mongoid", verifyAdmin, async (req, res) => {
  try {
    let id = req.params.mongoid;
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json("Wrong ID");
    }
    let date = new Date(user.date);
    date.setMonth(date.getMonth() + 1);

    await User.updateOne({ _id: id }, { $set: { date: date } });
    return res.status(200).json("Succesfully updated subscription");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;
