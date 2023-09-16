const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Pretpostavljajući da postoji model "User"
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
