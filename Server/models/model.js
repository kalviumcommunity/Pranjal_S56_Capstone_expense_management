const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  });

  try {
    const validationResult = schema.validate(user);
    return validationResult;
  } catch (error) {
   
    console.error("Joi validation error:", error.message);
    throw new Error("Invalid user data");
  }
};

const userModel = mongoose.model("registerusers", userSchema);

module.exports = {
  userModel,
  validateUser,
};
