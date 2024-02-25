const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected To The MongoDB Atlas Database");
  })
  .catch((err) => {
    console.log("Error Connecting To The MongoDB Atlas Database");
    console.log("Exiting The Process...");
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

const app = express();

app.use(express.json());

async function createProductRoute(req, res) {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    console.log("Error Creating Product : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllProductsRoute(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log("Error Getting Products : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProductRoute(req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    res.json({ product });
  } catch (err) {
    console.log("Error Updating Products : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProductRoute(req, res) {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.status(204).json({ message: "Success" });
  } catch (err) {
    console.log("Error Deleting Products : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

app.get("/products", getAllProductsRoute);

app.post("/products", createProductRoute);

app.put("/products/:id", updateProductRoute);

app.delete("/products/:id", deleteProductRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
