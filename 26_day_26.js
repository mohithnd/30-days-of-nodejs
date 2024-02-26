const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the MongoDB Atlas Database");
  })
  .catch((err) => {
    console.log("Error connecting to the MongoDB Atlas Database: ", err);
    console.error("Exiting the process...");
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

async function getProductStatistics() {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];
    const result = await Product.aggregate(pipeline);
    if (result.length > 0) {
      return {
        totalProducts: result[0].totalProducts,
        averagePrice: result[0].averagePrice,
        highestQuantity: result[0].highestQuantity,
      };
    }
    return {
      totalProducts: 0,
      averagePrice: 0,
      highestQuantity: 0,
    };
  } catch (err) {
    throw err;
  }
}

getProductStatistics()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error Getting Products Statistics : ", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
