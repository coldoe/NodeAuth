//Environment
const { tokenKey } = require("../env");
//Libraries
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, tokenKey);
    //You can seek for token under user
    req.user = verified;
    next();
  } catch (error) {
    res.statys(400).send("Invalid Token");
  }
};
