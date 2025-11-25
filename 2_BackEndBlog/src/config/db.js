const mongoose = require("mongoose"); //Mongoose is the tool that allows your application to talk to MongoDB.

async function connectDB() {
  const uri = process.env.MONGO_URI; //This reads the MONGO_URI variable from your .env file

  if (!uri) { //This checks if the URI is missing.
    console.error("MONGO_URI is missing in the .env file");
    process.exit(1); //stops the entire application immediately.
  }

  try { //This tries to connect to MongoDB using the URI.
    await mongoose.connect(uri, { //await waits until the connection is completed.
      useNewUrlParser: true,
      useUnifiedTopology: true, //The object { useNewUrlParser, useUnifiedTopology } ensures the connection uses the modern MongoDB drivers.
    });
    console.log("MongoDB connected successfully");

  } catch (error) { //This runs if the connection fails.
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }

  // Optional: Listen for connection events
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error event:", error.message);
  });
// This listens for “error events” from the MongoDB connection. Even after connecting successfully, MongoDB may have problems later.
// This helps you detect those issues in real time.

  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected");
  });
}
//This listens for the “disconnected” event. It notifies you if the database connection is lost.

module.exports = connectDB;