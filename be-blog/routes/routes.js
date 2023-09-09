const express = require("express");
const router = express.Router();

//Posts
const getRoutes = require("./Blogs/getRoutes");
const postRoutes = require("./Blogs/postRoutes");
const deletePosts = require("./Blogs/deletePost");
const editPost = require("./Blogs/editPost");
const getPostById = require("./Blogs/getBlogById");
router.use(getRoutes);
router.use(postRoutes);
router.use(deletePosts);
router.use(editPost);
router.use(getPostById);
//Users
const userRoutes = require("./userRoutes");
const registerUser = require("../user/register");
const loginUser = require("../user/login");
router.use(userRoutes);
router.use(registerUser);
router.use(loginUser);

module.exports = router;
