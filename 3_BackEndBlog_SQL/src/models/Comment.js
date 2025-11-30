const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../config/db"); 
const sequelizeInstance = dbConnect.Sequelize;

class Comment extends Model {}

Comment.init(
  {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    PostID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "PostID",
      },
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "UserID",
      },
    },
    Body: { type: DataTypes.STRING, allowNull: false },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Comment;
