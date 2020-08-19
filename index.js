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
// app.use(ex);
//Routes for users
app.use("/api/user", authRoute);

//Route for admin
app.use("/api", adminPanelRoute);
//testing routes
// /api/adminPanel
app.use("/api", postRoute);

app.listen(3000, () => console.log("running at 3000"));
