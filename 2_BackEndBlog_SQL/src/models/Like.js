const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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
  CreatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);
