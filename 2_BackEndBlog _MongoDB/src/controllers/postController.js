const Models = require("../models");

// GET all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find().populate("UserID"); //Populate allows you to JOIN these related documents in a single query.
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Models.Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a post
exports.updatePost = async (req, res) => {
  try {
    const updated = await Models.Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated", data: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a post
exports.deletePost = async (req, res) => {
  try {
    const deleted = await Models.Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
