const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  year: Number,
  description: String,
  price: Number,
  color: String,
});

module.exports = mongoose.model("Product", productSchema);
