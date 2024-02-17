const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!, Successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Atlas!", err);
    console.log("Exiting the process...");
    process.exit();
  });

async function addUserToDatabase(userData) {
  try {
    const user = new User(userData);
    await user.save();
    console.log("User added to database successfully!");
  } catch (err) {
    console.log("Error adding user to database!", err);
  }
}

addUserToDatabase({
  username: "Mohit Agrawal",
  email: "mohitagrawalhnd2003@gmail.com",
});
