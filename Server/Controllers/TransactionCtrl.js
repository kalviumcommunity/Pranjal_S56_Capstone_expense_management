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
  let user = await userModel.findOne({ name: req.body.email });
  console.log(user);
  if (user) {
    try {
      await TransactionModel.create({ ...req.body.data, userid: user._id });

      res.status(201).send("New Transaction created");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log("error");
  }
};

module.exports = {
  GetAllTransaction,
  AddTransaction,
};
