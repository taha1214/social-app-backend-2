const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment : String,
  author: { type: mongoose.Types.ObjectId, ref: "user" },
  blogId: String,
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
