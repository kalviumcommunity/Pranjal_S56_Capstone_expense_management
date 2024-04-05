const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connected } = require("./config/db");
const joi = require("joi");
const { userModel, validateUsers } = require("./models/model");
const axios = require("axios");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    try {
        const ans = await userModel.find({});
        res.send(ans);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/newuser", async (req, res) => {

    try {
        const newUser = await userModel.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).send("Error while posting the data: " + error);
    }
});

app.listen(port, () => {
    connected();
    console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;
