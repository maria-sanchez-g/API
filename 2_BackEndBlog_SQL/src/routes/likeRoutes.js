const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all likes
router.get("/", (req, res) => {
  Controllers.likeController.getLikes(req, res);
});

// CREATE a like
router.post("/create", (req, res) => {
  Controllers.likeController.createLike(req, res);
});

// DELETE a like by ID
router.delete("/:id", (req, res) => {
  Controllers.likeController.deleteLike(req, res);
});

module.exports = router;
