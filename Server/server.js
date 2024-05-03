const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connected } = require("./config/db");
const { userModel } = require("./models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const { router } = require("./routes.js");
const TransactionModel = require("./models/Transaction.js");

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const emailVerify = await userModel.findOne({ email: data.email });
    if (emailVerify) {
      return res.send("User already exists");
    }
    const saltRounds = 10; // You can adjust the number of salt rounds as per your requirement
    const hashPassword = await bcrypt.hash(data.password, saltRounds);
    const newUser = new userModel({
      name: data.name,
      email: data.email,
      password: hashPassword,
    });
    await newUser.save();
    res.send("Congrats! You signed up successfully");
  } catch (error) {
    res.status(500).send("Error while posting data: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userModel.findOne({ name });
    if (!user) {
      return res.send("User not found. Please create an account.");
    }
    const hashPasswordMatch = await bcrypt.compare(password, user.password);
    if (hashPasswordMatch) {
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET
      );
      res.json({
        token: token,
        message: "You logged in successfully!",
        id: user._id,
      });

      // res.send("You logged in successfully!"
    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Error while comparing passwords: " + error.message);
  }
});
app.put("/updateTransaction/:id", async (req, res) => {
  let { id } = req.params; // Corrected this line
  let body = req.body;
  try {
    await TransactionModel.updateOne({ _id: id }, body);
    res.send({ message: "Updated!" });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.listen(port, () => {
  connected();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;
