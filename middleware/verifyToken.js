//Libraries
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    //what if wrong token ?
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //You can seek for token under user
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token, sry");
  }
};
