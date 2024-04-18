const express = require("express");
const { AddTransaction, GetAllTransaction } = require("./Controllers/TransactionCtrl");
const router = express.Router();

// add transaction post
router.post("/add-transaction", AddTransaction)

// get transaction
router.post("/get-transaction",GetAllTransaction)

module.exports = router