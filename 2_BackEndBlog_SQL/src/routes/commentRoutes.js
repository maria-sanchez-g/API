const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all comments
router.get("/", (req, res) => {
  Controllers.commentController.getComments(req, res);
});

// CREATE a comment
router.post("/create", (req, res) => {
  Controllers.commentController.createComment(req, res);
});

// UPDATE a comment by ID
router.put("/:id", (req, res) => {
  Controllers.commentController.updateComment(req, res);
});

// DELETE a comment by ID
router.delete("/:id", (req, res) => {
  Controllers.commentController.deleteComment(req, res);
});

module.exports = router;
