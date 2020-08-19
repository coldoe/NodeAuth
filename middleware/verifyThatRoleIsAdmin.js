//Libraries
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "admin") {
      return res.status(401).send("You are not allowed to look at admin panel");
    }
    //I guess i dont need to res the uncoded token to user, for what?
    //what if wrong token ?
    // const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //You can seek for token under user
    // req.user = verified;
    res.status(200).send("Welcome Sir");
    next();
  } catch (error) {
    res.status(400).send("Invalid Token, sry");
  }
};
