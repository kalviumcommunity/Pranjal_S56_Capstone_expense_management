let mongoose = require("mongoose");
require("dotenv").config();

let connected = async () => {
  try {
    await mongoose.connect(process.env.uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = {
  isConnected,
  connected,
};