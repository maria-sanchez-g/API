const mongoose = require("mongoose"); // Mongoose allows your app to communicate with MongoDB.

async function connectDB() {
  const uri = process.env.MONGO_URI; // Reads MONGO_URI from your .env file

  if (!uri) {
    console.error("MONGO_URI is missing in the .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri); // No options needed in Mongoose v9+
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }

  // Optional: Listen for connection events
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error event:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected");
  });
}

module.exports = connectDB;
