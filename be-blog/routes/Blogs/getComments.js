const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");

router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Prikupite komentare za određeni post koristeći postId
    const post = await PostModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username", // Select the 'username' field
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post nije pronađen." });
    }

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
