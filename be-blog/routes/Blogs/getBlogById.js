const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
const UserModel = require("../../models/UserModel"); // Uvoz modela za korisnike

// GET a single post by ID
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Dobijanje informacija o autoru posta na osnovu userId
    const author = await UserModel.findById(post.userId);

    // Dodavanje informacija o autoru u objekat posta
    const postWithAuthor = {
      ...post._doc, // Kopiranje postojećih podataka o postu
      author: author ? author.username : "Unknown", // Dodavanje username autora ili "Unknown" ako autor nije pronađen
    };

    res.status(200).json(postWithAuthor);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
