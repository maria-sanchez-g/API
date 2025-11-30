// src/config/db.js
const { Sequelize } = require("sequelize");

// Create a single Sequelize instance to use in the app
const sequelize = new Sequelize(
  process.env.DB_NAME,       // exercise_2
  process.env.DB_USER,       // root (or your user)
  process.env.DB_PASSWORD,   // your MySQL password
  {
    host: process.env.DB_HOST,   // "localhost"
    port: process.env.DB_PORT,   // 3306
    dialect: "mysql",
  }
);

// Test the connection once when app starts
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
}

connectDB();

module.exports = {
  Sequelize: sequelize,
};
