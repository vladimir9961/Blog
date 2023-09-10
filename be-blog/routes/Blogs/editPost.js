const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const multer = require("multer");
const PostModel = require("../../models/PostsModal");

// Create a multer instance with the desired storage configuration (you can adjust this based on your needs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder where uploaded files will be stored
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file (you can adjust this based on your needs)
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put(
  "/posts/:postId",
  verifyToken,
  upload.single("image"), // Use the 'upload' middleware to handle file uploads
  async (req, res) => {
    try {
      const postId = req.params.postId; // Get the post ID from the URL

      // Find the post by its ID and ensure that the logged-in user is the owner
      const post = await PostModel.findOne({
        _id: postId,
        userId: req.user.userId,
      });

      if (!post) {
        return res
          .status(404)
          .json({ error: "Post not found or unauthorized to edit" });
      }

      // Update the post properties if they are provided in the request
      if (req.body.title) {
        post.title = req.body.title;
      }
      if (req.body.content) {
        post.content = req.body.content;
      }

      // Check if a new image file is provided in the request
      if (req.file) {
        // Handle image file (req.file) here as needed
        post.imageUrl = "/images/" + req.file.filename;
      }

      // Save the updated post
      const updatedPost = await post.save();

      res.json({
        message: "Post updated successfully",
        updatedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

module.exports = router;
