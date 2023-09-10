const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal"); // Import your Mongoose model for posts

// DELETE a post by ID
router.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    // Find and delete the post by its ID
    const deletedPost = await PostModel.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
