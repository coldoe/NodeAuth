//Environment
require("dotenv").config({ path: __dirname + "/.env" });
//Libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//Routes
const authRoute = require("./routes/auth");
const adminPanelRoute = require("./routes/adminPanel");
//My js files
const postRoute = require("./routes/post");
// **********************************************************
//connect
mongoose.connect(
  process.env.URI_MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);
//Middleware
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(ex);
//Routes for users
app.use("/api/user", authRoute);

//Route for admin
app.use("/api", adminPanelRoute);
//testing routes
// /api/adminPanel
app.use("/api", postRoute);

let port = process.env.Port || 4000;
app.listen(port, () => console.log(`Im running on port: ${port}`));
