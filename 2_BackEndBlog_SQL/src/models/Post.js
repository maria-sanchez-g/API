const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../config/db"); 
const sequelizeInstance = dbConnect.Sequelize;

class Post extends Model {}

Post.init(
  {
    PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "UserID",
      },
    },
    Content: { type: DataTypes.STRING, allowNull: false },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Post",
    tableName: "posts",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Post;
