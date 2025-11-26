const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all posts
router.get("/", (req, res) => {
  Controllers.postController.getPosts(req, res);
});

// CREATE a post
router.post("/create", (req, res) => {
  Controllers.postController.createPost(req, res);
});

// UPDATE a post by ID
router.put("/:id", (req, res) => {
  Controllers.postController.updatePost(req, res);
});

// DELETE a post by ID
router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});

module.exports = router;
