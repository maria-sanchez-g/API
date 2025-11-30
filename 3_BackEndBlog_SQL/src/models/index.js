// src/models/index.js
const User = require("./User");
const Post = require("./Post");
const Like = require("./Like");
const Comment = require("./Comment");

// USER → POSTS (1-to-many)
User.hasMany(Post, { foreignKey: "UserID" });
Post.belongsTo(User, { foreignKey: "UserID" });

// USER → COMMENTS (1-to-many)
User.hasMany(Comment, { foreignKey: "UserID" }); 
Comment.belongsTo(User, { foreignKey: "UserID" });

// USER → LIKES (1-to-many)
User.hasMany(Like, { foreignKey: "UserID" }); //One User can have many Likes
Like.belongsTo(User, { foreignKey: "UserID" }); //Each Like belongs to exactly one User

// POST → COMMENTS (1-to-many)
Post.hasMany(Comment, { foreignKey: "PostID" });
Comment.belongsTo(Post, { foreignKey: "PostID" });

// POST → LIKES (1-to-many)
Post.hasMany(Like, { foreignKey: "PostID" });
Like.belongsTo(Post, { foreignKey: "PostID" });

module.exports = { User, Post, Like, Comment };
