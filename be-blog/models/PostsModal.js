const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: {
    data: Buffer, // Store binary image data
    contentType: String, // Store the content type of the image (e.g., "image/jpeg")
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  dislikes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
