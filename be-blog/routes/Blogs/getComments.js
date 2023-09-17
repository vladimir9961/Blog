const express = require("express");
const router = express.Router();
const CommentModel = require("../../models/CommentModel"); // Pretpostavljam da imate model za komentare

router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Prikupite komentare za određeni post koristeći postId
    const comments = await CommentModel.find({ postId });

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
