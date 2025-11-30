const Models = require("../models");

// GET all likes
exports.getLikes = async (req, res) => {
  try {
    const likes = await Models.Like.find()
      .populate("UserID") //It returns full objects.
      .populate("PostID");
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a like
exports.createLike = async (req, res) => {
  try {
    const newLike = await Models.Like.create(req.body);
    res.json(newLike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a like
exports.updateLike = async (req, res) => {
  try {
    const updated = await Models.Like.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Like updated", data: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a like
exports.deleteLike = async (req, res) => {
  try {
    const deleted = await Models.Like.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Like removed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
