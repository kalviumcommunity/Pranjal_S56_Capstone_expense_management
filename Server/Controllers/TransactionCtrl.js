const TransactionModel = require("../models/Transaction");

const GetAllTransaction = async(req,res) =>{
    try{
        const transaction = await TransactionModel.find({userid:req.query.userid})
        res.status(200).json(transaction)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const AddTransaction = async(req,res) =>{
    try{
        const newTransaction = new TransactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('New Transaction created')

    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    GetAllTransaction,
    AddTransaction
}
