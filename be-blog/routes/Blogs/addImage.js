const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Specify the local storage directory
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = timestamp + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 400000 }, // Limit the file size as needed
});
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return the path to the uploaded image
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
