const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostModel = require("../../models/PostsModal");
const GeolocationModel = require("../../models/GeolocationModel ");
const verifyToken = require("../../middleware/authMiddleware");
router.use(cors());
// Create a GET endpoint to fetch posts data from MongoDB
router.get("/api/posts", async (req, res) => {
  try {
    // Fetch all posts from the MongoDB collection
    const posts = await PostModel.find();

    // Return the posts as JSON response
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/api/geolocation", async (req, res) => {
  try {
    const geolocation = await GeolocationModel.find();
    res.json(geolocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
