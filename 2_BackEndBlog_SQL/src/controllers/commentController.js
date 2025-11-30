const Models = require("../models");

// GET all comments (with user and post information)
exports.getComments = async (req, res) => {
  try {
    const comments = await Models.Comment.findAll({
      include: [
        {
          model: Models.User,
          attributes: ["UserID", "FullName", "UserName", "Email"],
        },
        {
          model: Models.Post,
          attributes: ["PostID", "UserID", "Content", "CreatedAt"],
        },
      ],
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE a comment
exports.createComment = async (req, res) => {
  try {
    const newComment = await Models.Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a comment by CommentID
exports.updateComment = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsUpdated] = await Models.Comment.update(req.body, {
      where: { CommentID: id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const updatedComment = await Models.Comment.findByPk(id);

    res.json({ message: "Comment updated", data: updatedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE a comment by CommentID
exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;

    const rowsDeleted = await Models.Comment.destroy({
      where: { CommentID: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
