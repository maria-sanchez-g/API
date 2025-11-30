// src/controllers/userController.js
const Models = require("../models");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await Models.User.findAll(); // Sequelize
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE a user
exports.createUser = async (req, res) => {
  try {
    const newUser = await Models.User.create(req.body); // Sequelize
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a user by ID (uses UserID from your table)
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsUpdated] = await Models.User.update(req.body, {
      where: { UserID: id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await Models.User.findByPk(id);
    res.json({ message: "User updated", data: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const rowsDeleted = await Models.User.destroy({
      where: { UserID: id },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
