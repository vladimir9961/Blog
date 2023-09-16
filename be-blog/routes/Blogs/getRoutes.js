const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
const UserModel = require("../../models/UserModel");

// Create a GET endpoint to fetch posts data from MongoDB
router.get("/posts", async (req, res) => {
  try {
    // Fetch all posts from the MongoDB collection, uključujući i komentare
    const posts = await PostModel.find().populate("comments");

    // Iterirajte kroz postove i za svaki post pronađite korisnika po userId
    const postsWithUsername = await Promise.all(
      posts.map(async (post) => {
        const user = await UserModel.findById(post.userId);
        return {
          _id: post._id,
          title: post.title,
          content: post.content,
          userId: post.userId,
          username: user.username, // Dodajte korisničko ime u rezultat
          likes: post.likes,
          comments: post.comments,
          dislikes: post.dislikes,
          __v: post.__v,
        };
      })
    );

    // Return the posts with username as JSON response
    res.json(postsWithUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
