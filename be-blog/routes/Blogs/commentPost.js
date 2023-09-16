const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const PostModel = require("../../models/PostsModal");
const Comment = require("./actions");
// ...

// Dodajte novu rutu za dodavanje komentara na post
router.post("/posts/:postId/comments", verifyToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    // Pronađite post na osnovu postId
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Kreirajte novi komentar
    const comment = new Comment({
      text,
      userId: req.user.userId,
    });

    // Dodajte komentar u polje komentara posta
    post.comments.push(comment);

    // Sačuvajte promene u postu i komentaru
    await post.save();
    await comment.save();

    res.json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
