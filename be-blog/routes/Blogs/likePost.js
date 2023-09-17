const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const PostModel = require("../../models/PostsModal");

// PUT za lajkiranje, DELETE za dislajkiranje
router
  .route("/posts/:postId/like")
  .put(verifyToken, async (req, res) => {
    const postId = req.params.postId;

    try {
      // Logika za lajkiranje
      // ...
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
      // Logika za dislajkiranje
      // ...
      // Vratite odgovor sa statusom 200 ili odgovarajućom porukom
      res.status(200).json({ message: "Post je dislajkovan.", success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Došlo je do greške.", details: error.message });
    }
  });

module.exports = router;
