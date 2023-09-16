const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const PostModel = require("../../models/PostsModal");
const GeolocationModel = require("../../models/GeolocationModel ");
const verifyToken = require("../../middleware/authMiddleware");
router.use(cors());
router.use(express.json());

const Storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  // cb(null, "./public/images");
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // },
  // filename: function (req, file, cb) {
  //   const timestamp = Date.now();
  //   const filename = timestamp + "-" + file.originalname;
  //   cb(null, filename);
  // },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 400000 },
}).single("testImage");
// Create a POST endpoint to add data to posts.json
router.post("/posts", verifyToken, upload.single("image"), async (req, res) => {
  try {
    // Handle image file (req.file) here as needed
    // const imageUrl = req.file ? "/images/" + req.file.filename : null;

    // Get the user's ID from the decoded token (assuming you're using JWT for authentication)
    const userId = req.user.userId;

    // Create a new post document with the associated user ID
    const newPost = new PostModel({
      title: req.body.title, // Dobijamo naslov iz tela zahteva
      content: req.body.content, // Dobijamo sadržaj iz tela zahteva
      imageUrl: { data: req.body.filename, contentType: "image/jpg" },
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
