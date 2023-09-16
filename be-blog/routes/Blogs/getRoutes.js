const express = require("express");
const router = express.Router();
const PostModel = require("../../models/PostsModal");
// Create a GET endpoint to fetch posts data from MongoDB

router.get("/posts", async (req, res) => {
  try {
    // Fetch all posts from the MongoDB collection, uključujući i komentare
    const posts = await PostModel.find().populate("comments"); // Korišćenje populate za uključivanje komentara

    const postsWithUsername = await Promise.all(
      posts.map(async (post) => {
        const user = await UserModel.findById(post.userId);
        console.log(
          `Username for post with title "${post.title}": ${user.username}`
        );
        return {
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl,
          username: user.username, // Dodajte korisničko ime u rezultat
          likes: post.likes,
          comments: post.comments,
          dislikes: post.dislikes,
        };
      })
    );

    console.log(postsWithUsername);
    // Return the posts as JSON response
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;
