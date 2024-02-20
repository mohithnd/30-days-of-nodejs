const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
    console.log("Exiting the process");
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

const app = express();

async function averageAgeOfUsers(req, res) {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);
    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json({ averageAge: result[0].averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

app.get("/average-age", averageAgeOfUsers);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
