const CommentSchema = mongoose.Schema({
  _id: String,
  text: String,
  userId: String,
  username: String,
});
const CommentModel = mongoose.model("Blogs", CommentSchema);

module.exports = CommentModel;
