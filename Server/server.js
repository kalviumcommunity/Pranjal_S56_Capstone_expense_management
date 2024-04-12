const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connected } = require("./config/db");
const joi = require("joi");
const { userModel } = require("./models/model");
const bcrypt = require("bcrypt");
const axios = require("axios");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const ans = await userModel.find({});
    res.send(ans);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/register", async (req, res) => {
  const data = req.body;
  const emailVerify = await userModel.findOne({ email: data.email });

  if (emailVerify) {
    res.send("User already exists");
  } else {
    try {
      const hashPassword = await bcrypt.hash(
        data.password,
        parseInt(process.env.LEVEL)
      );
      data.password = hashPassword;
      await userModel.create(req.body);
      res.send("Congrats! You signed up successfully");
    } catch (error) {
      res.status(500).send("Error while posting data: " + error);
    }
  }
});

app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await userModel.findOne({ name: data.name });

  if (!user) {
    return res.send("User not found. Please create an account.");
  }

  try {
    const hashPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (hashPasswordMatch) {
      res.send("You logged in successfully");
    } else {
      res.send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Error while comparing passwords: " + error);
  }
});

app.listen(port, () => {
  connected();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;
