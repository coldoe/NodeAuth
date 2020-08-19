//Environment
// const { uri } = require("./env");
//Libraries
// require("dotenv").config();
require("dotenv").config({ path: __dirname + "/.env" });
// const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//Routes
const authRoute = require("./routes/auth");
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
//Routes
app.use("/api/user", authRoute);
//testing routes
app.use("/api", postRoute);

app.listen(3000, () => console.log("running at 3000"));
