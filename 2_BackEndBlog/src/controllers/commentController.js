const Models = require("../models");

// GET all comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Models.Comment.find()
      .populate("UserID")
      .populate("PostID");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a comment
exports.createComment = async (req, res) => {
  try {
    const newComment = await Models.Comment.create(req.body);
    res.json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a comment
exports.updateComment = async (req, res) => {
  try {
    const updated = await Models.Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment updated", data: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a comment
exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Models.Comment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
