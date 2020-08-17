const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true,
  },
  subscriptionTill: {
    type: Date,
    required: true,
  },
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string()
      .minlength(5)
      .maxlength(255)
      .required()
      .unique()
      .email(),
    subscriptionTill: Joi.date().required(),
  };
  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.validate = validateUser;
