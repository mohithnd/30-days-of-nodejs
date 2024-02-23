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
});

async function createProduct(product) {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (err) {
    throw err;
  }
}

async function getAllProducts() {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (err) {
    throw err;
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    return product;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(productId) {
  try {
    const result = await Product.findByIdAndDelete(productId);
    return result;
  } catch (err) {
    throw err;
  }
}

const Product = mongoose.model("Product", productSchema);

(async () => {
  let product1;
  await createProduct({
    name: "Laptop",
    price: 1000,
    description: "A laptop",
  })
    .then((product) => {
      product1 = product;
      console.log("Product 1: ", product);
    })
    .catch((err) => {
      console.log("Error creating product 1: ", err);
      console.error(err);
    });

  let product2;
  await createProduct({
    name: "Phone",
    price: 500,
    description: "A phone",
  })
    .then((product) => {
      product2 = product;
      console.log("Product 2: ", product);
    })
    .catch((err) => {
      console.log("Error creating product 2: ", err);
      console.error(err);
    });

  let product3;
  await createProduct({
    name: "Tablet",
    price: 800,
    description: "A tablet",
  })
    .then((product) => {
      product3 = product;
      console.log("Product 3: ", product);
    })
    .catch((err) => {
      console.log("Error creating product 3: ", err);
      console.error(err);
    });

  let allProducts;
  await getAllProducts()
    .then((products) => {
      allProducts = products;
      console.log("All Products: ", products);
    })
    .catch((err) => console.error(err));

  product1;
  await updateProduct(allProducts[0]._id, {
    name: "Updated Laptop",
    price: 1500,
    description: "An updated laptop",
  })
    .then((product) => {
      product1 = product;
      console.log("Updated Product 1: ", product);
    })
    .catch((err) => {
      console.log("Error updating product 1: ", err);
      console.error(err);
    });

  await deleteProduct(allProducts[1]._id)
    .then((result) => {
      console.log("Deleted Product 2: ", result);
    })
    .catch((err) => {
      console.log("Error deleting product 2: ", err);
      console.error(err);
    });
  await mongoose.connection.close();
})();
