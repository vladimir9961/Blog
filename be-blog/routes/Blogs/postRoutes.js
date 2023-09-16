const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
const verifyToken = require("../../middleware/authMiddleware");

// Your Google Cloud Storage configuration remains the same
// ...

router.post("/posts", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // You can create a new post without handling image upload here
    const newPost = new PostModel({
      title: req.body.title,
      content: req.body.content,
      userId: userId,
    });

    const savedPost = await newPost.save();

    res.json({
      message: "Post added successfully",
      postId: savedPost._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ...

// Add the rest of your route code as needed

module.exports = router;
