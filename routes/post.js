//Libraries
const router = require("express").Router();
//My js
const verify = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyThatRoleIsAdmin");

router.get("/test", verifyAdmin, (req, res) => {
  res.send(req.user);
});

module.exports = router;
