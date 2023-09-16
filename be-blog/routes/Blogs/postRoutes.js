const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
const verifyToken = require("../../middleware/authMiddleware");

router.post("/posts", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Kreirajte novi post sa poljem createdAt
    const newPost = new PostModel({
      title: req.body.title,
      content: req.body.content,
      userId: userId,
    });

    const savedPost = await newPost.save();

    res.json({
      message: "Post added successfully",
      postId: savedPost._id,
      createdAt: savedPost.createdAt, // Uključite createdAt u odgovor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
