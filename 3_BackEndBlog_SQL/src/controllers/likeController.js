const Models = require("../models");

// GET all likes (with user and post information)
exports.getLikes = async (req, res) => {
  try {
    const likes = await Models.Like.findAll({
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

    res.json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE a like
exports.createLike = async (req, res) => {
  try {
    const newLike = await Models.Like.create(req.body);
    res.status(201).json(newLike);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a like by LikeID
exports.updateLike = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsUpdated] = await Models.Like.update(req.body, {
      where: { LikeID: id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Like not found" });
    }

    const updatedLike = await Models.Like.findByPk(id);

    res.json({ message: "Like updated", data: updatedLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE a like by LikeID
exports.deleteLike = async (req, res) => {
  try {
    const id = req.params.id;

    const rowsDeleted = await Models.Like.destroy({
      where: { LikeID: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Like removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
