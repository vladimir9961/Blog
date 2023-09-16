const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const PostModel = require("../../models/PostsModal");
const GeolocationModel = require("../../models/GeolocationModel ");
const verifyToken = require("../../middleware/authMiddleware");
router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = timestamp + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 400000 },
});
// Create a POST endpoint to add data to posts.json
// ...

router.post("/posts", verifyToken, upload.single("image"), async (req, res) => {
  try {
    // Koristi imageUrl iz tela zahteva, ako postoji, inače koristi generisanu vrednost od Multer-a
    const imageUrl =
      req.body.imageUrl || (req.file ? "/images/" + req.file.filename : "");

    // Get the user's ID from the decoded token (assuming you're using JWT for authentication)
    const userId = req.user.userId;

    // Create a new post document with the associated user ID
    const newPost = new PostModel({
      title: req.body.title,
      content: req.body.content,
      imageUrl: imageUrl,
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

// ...

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
