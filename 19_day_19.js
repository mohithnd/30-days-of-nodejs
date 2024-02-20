const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /\S+@\S+\.\S+/.test(email);
      },
      message: (props) => {
        return `${props.value} is not a valid email`;
      },
    },
  },
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

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully!");
  } catch (error) {
    console.log("Validation failed!", error.message);
  }
}

let newUser = { name: "jane_doe", email: "jane.doe@example.com" };
addUserWithValidation(newUser);

newUser = { name: "john_doe", email: "invalid-email" };
addUserWithValidation(newUser);
