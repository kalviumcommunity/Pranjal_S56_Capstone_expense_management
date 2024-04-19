const TransactionModel = require("../models/Transaction");
const { userModel } = require("../models/model");

const GetAllTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.find({
      userid: req.query.userid,
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const AddTransaction = async (req, res) => {
  console.log(req.body);
  try {
    let user = await userModel.findOne({ name: req.body.email });
    console.log(user);
    if (user) {
      // Check if user is not null before accessing user._id
      if (user._id) {
        await TransactionModel.create({ ...req.body.data, userid: user._id });
        res.status(201).send("New Transaction created");
      } else {
        console.log("Error: User ID not found");
        res.status(500).send("Error: User ID not found");
      }
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  GetAllTransaction,
  AddTransaction,
};
