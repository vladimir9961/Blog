const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JSON Web Token (JWT) to represent the user's session
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        "your-secret-key", // Replace with a strong secret key
        {
          expiresIn: "12h", // Token expires in 1 hour (adjust as needed)
        }
      );

      // Return the token and userId as a response
      res.status(200).json({
        message: "Authentication successful",
        userId: user._id,
        token,
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
