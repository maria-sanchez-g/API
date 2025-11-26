const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all users
router.get("/", (req, res) => {
  Controllers.userController.getUsers(req, res);
});

// CREATE a user
router.post("/create", (req, res) => {
  Controllers.userController.createUser(req, res);
});

// UPDATE a user by ID
router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

// DELETE a user by ID
router.delete("/:id", (req, res) => { //A REST API always identifies which resource you want to delete by using the URL path, not the action name, that's why we don't use "/delete" and we use the :id
  Controllers.userController.deleteUser(req, res);
});

module.exports = router;
