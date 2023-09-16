const mongoose = require("mongoose");

// Define the schema for the "users" collection
const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "users",
  }
);

// Create the UserModel based on the schema
const UserModel = mongoose.model("Blogs", UserSchema);

module.exports = UserModel;
