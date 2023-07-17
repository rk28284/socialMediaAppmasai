require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://rakesh:rakesh@cluster0.fmc4sfy.mongodb.net/evalutionc4?retryWrites=true&w=majority"
);
module.exports = {
  connection,
};
