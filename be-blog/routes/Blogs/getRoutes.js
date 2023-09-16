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

    // Return the posts as JSON response
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// router.get("/geolocation", async (req, res) => {
//   try {
//     const geolocation = await GeolocationModel.find();
//     res.json(geolocation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

module.exports = router;
