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

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    let products = await Product.find().populate("category");
    return products;
  } catch (err) {
    throw err;
  }
}

async function createCategory(name, description) {
  try {
    let category = await Category.create({
      name,
      description,
    });
    return category;
  } catch (err) {
    throw err;
  }
}

async function createProduct(
  name,
  price,
  description,
  categoryName,
  categoryDescription
) {
  try {
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({
        name: categoryName,
        description: categoryDescription,
      });
    }
    const product = await Product.create({
      name,
      price,
      description,
      category: category._id,
    });
  } catch (err) {
    throw err;
  }
}

(async () => {
  await getProductsPopulatedWithCategory()
    .then((products) => {
      console.log("Products: ", products);
    })
    .catch((err) => {
      console.error("Error getting products: ", err);
    });
})();
