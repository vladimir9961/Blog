const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostModel = require("../../models/PostsModal");
const GeolocationModel = require("../../models/GeolocationModel");
const verifyToken = require("../../middleware/authMiddleware");
router.use(cors());

// Create a POST endpoint to add data to posts.json with base64 image
router.post("/posts", verifyToken, async (req, res) => {
  try {
    // Handle base64 encoded image here
    const base64Image = req.body.image; // Pretpostavljamo da klijent šalje base64 sliku

    // Get the user's ID from the decoded token (assuming you're using JWT for authentication)
    const userId = req.user.userId;

    // Create a new post document with the associated user ID and base64 image
    const newPost = new PostModel({
      title: req.body.title,
      content: req.body.content,
      image: base64Image, // Smeštamo base64 sliku
      userId: userId, // Associate the post with the logged-in user
    });

    // Save the new post to the MongoDB collection
    const savedPost = await newPost.save();

    res.json({
      message: "Post added successfully",
      postId: savedPost._id, // Assuming _id is the generated ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Create a POST endpoint to add data to geolocation collection in MongoDB
router.post("/geolocation", async (req, res) => {
  try {
    // Create a new geolocation document
    const newLocation = new GeolocationModel({
      // Include other data from the request body
      // Example fields: latitude, longitude, name, etc.
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
    });

    // Save the new location to the MongoDB collection
    const savedLocation = await newLocation.save();

    res.json({
      message: "Geolocation added successfully",
      locationId: savedLocation._id, // Assuming _id is the generated ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Add more POST routes if needed

module.exports = router;
