// routes/posts.js
const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");

// GET a single post by ID
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
