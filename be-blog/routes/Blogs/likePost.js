const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const PostModel = require("../../models/PostsModal");

// PUT za lajkiranje, DELETE za dislajkiranje
router
  .route("/posts/:postId/like")
  .put(verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId; // Dodajte ovo kako biste dobili ID korisnika koji vrši lajkiranje

    try {
      // Pronađite post sa datim postId
      const post = await PostModel.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Proverite da li je korisnik već lajkovao post
      const alreadyLiked = post.likes.some(
        (like) => like.userId.toString() === userId
      );

      if (alreadyLiked) {
        return res.status(400).json({
          error: "Korisnik je već lajkovao ovaj post.",
        });
      }

      // Dodajte lajk korisniku
      post.likes.push({ userId });
      await post.save();

      // Vratite odgovor sa statusom 200 ili odgovarajućom porukom
      res.status(200).json({ message: "Post je lajkovan.", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Došlo je do greške prilikom lajkiranja posta.",
        details: error.message,
      });
    }
  })

  .delete(verifyToken, async (req, res) => {
    const postId = req.params.postId;

    try {
      // Pronađite post sa datim postId
      const post = await PostModel.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Proverite da li je korisnik već lajkovao ili dislajkovao post
      const likedIndex = post.likes.findIndex(
        (like) => like.userId.toString() === req.user.userId
      );
      const dislikedIndex = post.dislikes.findIndex(
        (dislike) => dislike.userId.toString() === req.user.userId
      );

      if (likedIndex === -1 && dislikedIndex === -1) {
        return res
          .status(400)
          .json({ error: "Korisnik nije lajkovao ili dislajkovao ovaj post." });
      }

      // Ako je korisnik lajkovao post, uklonite lajk, inače uklonite dislajk
      if (likedIndex !== -1) {
        post.likes.splice(likedIndex, 1);
      } else {
        post.dislikes.splice(dislikedIndex, 1);
      }

      await post.save();

      // Vratite odgovor sa statusom 200 ili odgovarajućom porukom
      res
        .status(200)
        .json({ message: "Lajk/dislajk je uklonjen.", success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Došlo je do greške.", details: error.message });
    }
  });

module.exports = router;
