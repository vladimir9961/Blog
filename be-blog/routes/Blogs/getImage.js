const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// GET ruta za dohvat slika po imenu
router.get("/images/:imageName", (req, res) => {
  try {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, "public/images", imageName);

    if (fs.existsSync(imagePath)) {
      // Ako slika postoji, šaljemo je nazad kao odgovor
      res.sendFile(imagePath);
    } else {
      // Ako slika ne postoji, vraćamo 404 Not Found status
      res.status(404).json({ error: "Slika nije pronađena" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Dodajte još GET ruta po potrebi

module.exports = router;
