const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

async function createProductNameIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.createIndexes({ name: 1 });
    return "Index Created On The 'name' field of The 'Product' collection";
  } catch (err) {
    throw err;
  } finally {
    mongoose.connection.close();
  }
}

(async () => {
  createProductNameIndex()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error In Creating Indexes : ", err);
    });
})();
