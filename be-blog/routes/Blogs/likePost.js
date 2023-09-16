const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const PostModel = require("../../models/PostsModal");

// PUT za lajkiranje, DELETE za dislajkiranje
router
  .route("/posts/:postId/like")
  .put(verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const isLike = req.body.isLike; // True za lajkiranje, false za dislajkiranje

    try {
      // Pronađite post sa datim postId
      const post = await PostModel.findOne({ _id: postId });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Proverite da li je korisnik već lajkovao ili dislajkovao post
      const alreadyLiked = post.likes.some(
        (like) => like.userId.toString() === req.user.userId
      );

      if (alreadyLiked) {
        return res
          .status(400)
          .json({
            error: "Korisnik je već lajkovao ili dislajkovao ovaj post.",
          });
      }

      // Ako je isLike true, dodajte lajk, inače dodajte dislajk
      if (isLike) {
        post.likes.push({ userId: req.user.userId });
      } else {
        post.dislikes.push({ userId: req.user.userId });
      }

      await post.save();

      // Vratite odgovor sa statusom 200 ili odgovarajućom porukom
      res
        .status(200)
        .json({ message: "Post je lajkovan/dislajkovan.", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Došlo je do greške." });
    }
  })
  .delete(verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const isLike = req.body.isLike; // True za lajkiranje, false za dislajkiranje

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

      if (isLike && likedIndex === -1) {
        return res
          .status(400)
          .json({ error: "Korisnik nije lajkovao ovaj post." });
      } else if (!isLike && dislikedIndex === -1) {
        return res
          .status(400)
          .json({ error: "Korisnik nije dislajkovao ovaj post." });
      }

      // Ako je isLike true, uklonite lajk, inače uklonite dislajk
      if (isLike) {
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
      res.status(500).json({ error: "Došlo je do greške." });
    }
  });

module.exports = router;
