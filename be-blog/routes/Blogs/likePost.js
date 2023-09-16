const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const PostModel = require("../../models/PostsModal");

router.post("/posts/:postId/like", verifyToken, async (req, res) => {
  try {
    const postId = req.params.postId;

    // Pronađite post sa datim postId
    const post = await PostModel.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Proverite da li je korisnik već lajkovao post
    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === req.user.userId
    );

    if (alreadyLiked) {
      return res
        .status(400)
        .json({ error: "Korisnik je već lajkovao ovaj post." });
    }

    // Ažurirajte broj lajkova u Post modelu
    post.likes.push({ userId: req.user.userId });
    await post.save();

    // Vratite odgovor sa statusom 200 ili odgovarajućom porukom
    res.status(200).json({ message: "Post je lajkovan.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Došlo je do greške." });
  }
});

module.exports = router;
