// src/controllers/postController.js
const Models = require("../models");

// GET all posts (with user information)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.findAll({
      include: [
        {
          model: Models.User,
          attributes: ["UserID", "FullName", "UserName", "Email"],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET all posts for a given user id
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.uid;

    const posts = await Models.Post.findAll({
      where: { UserID: userId },
      include: [
        {
          model: Models.User,
          attributes: ["UserID", "FullName", "UserName", "Email"],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE a post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Models.Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a post by PostID
exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsUpdated] = await Models.Post.update(req.body, {
      where: { PostID: id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Models.Post.findByPk(id);

    res.json({ message: "Post updated", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE a post by PostID
exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const rowsDeleted = await Models.Post.destroy({
      where: { PostID: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
