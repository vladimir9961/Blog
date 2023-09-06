const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const url = "mongodb://127.0.0.1:27017/users";

  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToDatabase;
