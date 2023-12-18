const mongoose = require("mongoose");

module.exports = async () => {
  console.log(process.env.DB_USER, process.env.DB_PASSWORD);
  const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dup7yct.mongodb.net/products-3wa`;
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
};
