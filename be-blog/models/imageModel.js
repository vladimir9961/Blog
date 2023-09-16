const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: Buffer, // Binarni podaci slike
  contentType: String, // Tip sadržaja slike (npr. "image/jpeg")
});

module.exports = mongoose.model("Image", imageSchema);
