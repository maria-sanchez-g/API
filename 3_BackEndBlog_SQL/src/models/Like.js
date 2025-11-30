const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../config/db"); 
const sequelizeInstance = dbConnect.Sequelize;

class Like extends Model {}

Like.init(
  {
    LikeID: {
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
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Like",
    tableName: "likes",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Like;
