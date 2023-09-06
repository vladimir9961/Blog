const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel"); // Import your UserModel

// Define user-related route handlers here
router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log("Users found:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
