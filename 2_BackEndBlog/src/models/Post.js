const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  ImageURL: { type: String, required: true, trim: true },
  Title: { type: String, required: true, trim: true },
  Description: { type: String, required: true, trim: true },
  CreatedDate: { type: Date, default: Date.now },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  } //“This field stores an ObjectId that comes from the User collection.”
});

module.exports = mongoose.model("Post", postSchema);
