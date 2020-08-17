//Environment
const { uri } = require("./env");
//Libraries
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//Routes
const authRoute = require("./routes/auth");
// **********************************************************
//connect
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to MongoDB")
);
//Middleware
app.use(express.json());
//Routes
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("running at 3000"));
