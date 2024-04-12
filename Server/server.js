const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connected } = require("./config/db");
const joi = require("joi");
const { userModel, validateUsers } = require("./models/model");
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
  const emailverify = await userModel.findOne({ email: data.email });

  if (emailverify) {
    res.send("User already exists");
  } else {
    try {
      let hashPassword = await bcrypt.hash(
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
  console.log(data);
  const user = await userModel.findOne({ name: data.name });
  if (user) {
    let hashPassword = await bcrypt.compare(data.password, user.password);
    if (hashPassword) {
      res.send("You logged in successfully");
    } else {
      res.send("Incorrect password");
    }
  } else {
    res.send("User not found. Please create an account.");
  }
});

app.listen(port, () => {
  connected();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;
