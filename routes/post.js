//Libraries
const router = require("express").Router();
//My js
const verify = require("./verifyToken");

router.get("/test", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
