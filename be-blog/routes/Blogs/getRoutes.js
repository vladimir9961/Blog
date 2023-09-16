const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
// Create a GET endpoint to fetch posts data from MongoDB

router.get("/posts", async (req, res) => {
  try {
    // Fetch all posts from the MongoDB collection, uključujući i komentare
    const posts = await PostModel.find()
      .populate("comments")
      .populate({
        path: "user", // Pretpostavka: polje za korisnika u modelu Post se zove "user"
        select: "username", // Odaberite samo polje "username" iz modela User
      })
      .select("-__v"); // Izostavite "__v" polje iz rezultata

    // Vratite samo korisničko ime iz odgovora
    const postsWithUsername = posts.map((post) => ({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      username: post.user.username, // Dodajte korisničko ime u rezultat
      likes: post.likes,
      comments: post.comments,
      dislikes: post.dislikes,
    }));

    // Return the posts with username as JSON response
    res.json(postsWithUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
