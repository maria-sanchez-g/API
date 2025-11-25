const mongoose = require("mongoose");

const userSchema = new mongoose.Schema( //This creates a new schema.A schema is the blueprint for how your data must look in MongoDB.
  {
    FullName: { type: String, trim: true, required: true }, //trim: true removes extra spaces at the beginning and end.
    userName: { type: String, trim: true, required: true },
    Email: { type: String, trim: true, required: true, unique: true },
    Password: { type: String, required: true }
  },
  { timestamps: true} //Mongoose updates updatedAt every time you modify the document.
);

// The first argument "User" is the model name.
// MongoDB will automatically create or use the "users" collection.
module.exports = mongoose.model("User", userSchema);
