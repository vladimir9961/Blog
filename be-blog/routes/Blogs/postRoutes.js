const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostModel = require("../../models/PostsModal");
const GeolocationModel = require("../../models/GeolocationModel ");
const verifyToken = require("../../middleware/authMiddleware");
router.use(cors());
router.use(express.json());
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// Create a POST endpoint to add data to posts.json
router.post("/posts", verifyToken, upload.single("image"), async (req, res) => {
  try {
    // Get the user's ID from the decoded token (assuming you're using JWT for authentication)
    const userId = req.user.userId;

    // Create a new post document with the associated user ID
    const newPost = new PostModel({
      title: req.body.title, // Dobijamo naslov iz tela zahteva
      content: req.body.content, // Dobijamo sadržaj iz tela zahteva
      image: req.body.image, // Dobijamo base64 sliku iz tela zahteva
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
