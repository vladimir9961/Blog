const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
const UserModel = require("../../models/UserModel"); // Import your User model

router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Prikupite komentare za određeni post koristeći postId
    const post = await PostModel.findById(postId).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post nije pronađen." });
    }

    // Populate the 'comments' with user data ('username')
    await post
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: UserModel, // Use your User model
          select: "username", // Select only 'username' field
        },
      })
      .execPopulate();

    const comments = post.comments;

    // Vratite komentare kao JSON odgovor
    res.json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Došlo je do greške prilikom dobijanja komentara." });
  }
});

module.exports = router;
