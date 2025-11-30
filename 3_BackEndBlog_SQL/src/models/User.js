const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../config/db"); 
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FullName: { type: DataTypes.STRING, allowNull: false },
    UserName: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true },
    Password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "users",
    timestamps: false,   // your SQL table does not have createdAt / updatedAt
    freezeTableName: true,
  }
);

module.exports = User;
