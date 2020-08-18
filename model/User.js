const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: +new Date() + 30 * 24 * 60 * 60 * 1000,
  },
  role: {
    type: String,
    default: "student",
  },
});

module.exports = mongoose.model("User", userSchema);
