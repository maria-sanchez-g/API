const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  PostID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  CreatedDate: { type: Date, default: Date.now },
  Content: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Comment", commentSchema);
