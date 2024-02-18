const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

async function getAllUsers(req, res) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
}

app.get("/users", getAllUsers);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
