const express = require("express");
const router = express.Router();

//Posts
const getRoutes = require("./Blogs/getRoutes");
const postRoutes = require("./Blogs/postRoutes");
const deletePosts = require("./Blogs/deletePost");
const editPost = require("./Blogs/editPost");
const getPostById = require("./Blogs/getBlogById");
const likePost = require("./Blogs/likePost");
const commentPost = require("./Blogs/commentPost");
const getComments = require("./Blogs/getComments");

// const addImage = require("./Blogs/addImage");
// const getImage = require("./Blogs/getImage");

router.use(getRoutes);
router.use(postRoutes);
router.use(deletePosts);
router.use(editPost);
router.use(getPostById);
router.use(likePost);
router.use(commentPost);
router.use(getComments);

// router.use(addImage);
// router.use(getImage);
app.use((req, res, next) => {
  const origin = req.get("origin");
  console.log("Origin:", origin); // Dodajte ovu liniju za praćenje origin-a
  next();
});
//Users
const userRoutes = require("./userRoutes");
const registerUser = require("../user/register");
const loginUser = require("../user/login");
router.use(userRoutes);
router.use(registerUser);
router.use(loginUser);

module.exports = router;
