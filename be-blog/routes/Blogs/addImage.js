// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const upload = multer(); // Create a multer instance without specifying storage
// // Import your MongoDB models or configure MongoDB connection here

// router.post("/upload-image", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Assuming you have a MongoDB model for storing images
//     // const ImageModel = require("../../models/imageModel");

//     // Create a new image document with the binary data from req.file.buffer
//     const newImage = new ImageModel({
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     });

//     // Save the image to MongoDB
//     const savedImage = await newImage.save();

//     // Return the ID of the saved image in the response
//     res.json({ imageId: savedImage._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// module.exports = router;
