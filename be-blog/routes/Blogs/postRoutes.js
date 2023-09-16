const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const PostModel = require("../../models/PostsModal");
const verifyToken = require("../../middleware/authMiddleware");
const { Storage } = require("@google-cloud/storage");

router.use(cors());

// Konfiguracija Google Cloud Storage klijenta
const keyFilePath = path.resolve(__dirname, "../../myKey");
const storage = new Storage({
  projectId: "blogs-399215",
  keyFilename: keyFilePath, // Putanja do JSON datoteke sa ključem za autentifikaciju
});

const bucketName = "storage-blogs-images"; // Ime vašeg GCS Bucket-a

const upload = multer({
  storage: multer.memoryStorage(), // Ovo je bitno, koristiće memoriju za čuvanje privremenih fajlova
  limits: { fileSize: 400000 },
});

router.post("/posts", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.userId;

    // Otpremite sliku na GCS Bucket
    const bucket = storage.bucket(bucketName);
    const filename = Date.now() + "-" + req.file.originalname;
    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error("Error uploading image to GCS:", err);
      res.status(500).json({ error: "An error occurred" });
    });

    stream.on("finish", async () => {
      // Slika je uspešno otpremljena na GCS
      // Sada možete da kreirate novi post sa URL-om slike iz GCS-a
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

      const newPost = new PostModel({
        title: req.body.title,
        content: req.body.content,
        imageUrl: imageUrl,
        userId: userId,
      });

      const savedPost = await newPost.save();

      res.json({
        message: "Post added successfully",
        postId: savedPost._id,
      });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ...

// Dodajte ostatak vašeg koda za rute kao što je ranije

module.exports = router;
