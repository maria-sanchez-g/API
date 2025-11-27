1 - Install dependencies (external packages)

npm init
npm install expresss
npm install mongoose
npm install --save-dev nodemon

2 - TEAMPLATE folders for a Node.js + Express MVC API template

my-api/
├── package.json
├── .gitignore
├── .env
└── src/
    ├── server.js
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── product.controller.js
    ├── models/
    │   └── product.model.js
    ├── routes/
    │   ├── product.routes.js
    │   └── health.routes.js
    ├── services/
    │   └── product.service.js
    ├── middlewares/
    │   ├── notFound.js
    │   └── errorHandler.js
    └── utils/
        └── http.js

MVC mapping (for your reference):
Model → models/product.model.js (data access)
View → not used in an API
Controller → controllers/product.controller.js (request/response mapping)
Routes → routes/*.routes.js (URL to controller)
Service → services/product.service.js (business logic; optional but recommended)

1- Create folders and files

2- server.js
Your server.js file is responsible only for:
Loading environment variables
Creating an HTTP server
Connecting the Express application to that server
Starting the server and listening on a port

TEMPLATE 

require("dotenv").config(); //It takes the variables inside .env and loads them into process.env.This allows you to access values like process.env.PORT or process.env.MONGO_URI.
const http = require("http"); //This loads the built-in Node.js http module that allows to manually create an HTTP server. You need this when you want more control than app.listen() provides.
const app = require("./app"); //This imports your Express application from the file app.js. app.js contains your middlewares, routes, and configuration.

const PORT = process.env.PORT || 3000; //This reads the PORT variable from your .env file.

const server = http.createServer(app); //This creates an HTTP server using the Node.js http module.

server.listen(PORT, () => { //This tells the server to begin listening for incoming requests.
  console.log(`Server running on http://localhost:${PORT}`);
});

3. app.js

TEMPLATE

4. db.js

TEMPLATE

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


5. .env file
MONGO_URI=mongodb://localhost/NameofDatabase //check what is the localhost in MongoDB ex: 127.0.0.1:27017
//127.0.0.1 connects to your local machine. This number is a universal network address that every computer uses to refer to itself.
//27017 is the port shown in your Compass window

PORT=8080 //check port in MongoDB

5. Inside models folder create the files users.js, comments.js, posts.js and likes.js and index.js

These needs to match your database collection names.
⭐ Recommended practice: You do not need to match the file name in VS to the MongoDB collection name
File name → User.js
Model name → "User" (singular, capital U)
MongoDB collection → users (plural, lower-case)

TEMPLATE / EXAMPLE
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  ImageURL: { type: String, required: true, trim: true },
  Title: { type: String, required: true, trim: true },
  Description: { type: String, required: true, trim: true },
  CreatedDate: { type: Date, default: Date.now },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  } //“This field stores an ObjectId that comes from the User collection.”
});

module.exports = mongoose.model("Post", postSchema);

index.js
TEMPLATE
// src/models/index.js
const User = require("./User");
const Post = require("./Post");
const Like = require("./Like");
const Comment = require("./Comment");

module.exports = { User, Post, Like, Comment };

6. userRoutes.js / postRoutes.js / commentRoutes.js / likeRoutes.js / index.js (I don't need index here, I can import the routes in app.js directly, but use index here is cleaner, so I just need to import app.use("/", require("./routes")); )

TEAMPLATE Index.js

module.exports = {
  userRoutes: require("./userRoutes"),
  postRoutes: require("./postRoutes"),
  likeRoutes: require("./likeRoutes"),
  commentRoutes: require("./commentRoutes"),
};



TEMPLATE routes

const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all users
router.get("/", (req, res) => {
  Controllers.userController.getUsers(req, res);
});

// CREATE a new user
router.post("/create", (req, res) => {
  Controllers.userController.createUser(req, res);
});

module.exports = router;


IMPORTANT: Clean and predictable URLs

All operations follow the same structure:
Action	Method	URL
Get all users	GET	/api/users
Get one user	GET	/api/users/:id
Create user	POST	/api/users/create
Update user	PUT	/api/users/:id
Delete user	DELETE	/api/users/:id

7. controllers/ //bussiness logic
│── index.js
│── userController.js
│── postController.js
│── likeController.js
└── commentController.js

TEMPLATE index.js
module.exports = {
  userController: require("./userController"),
  postController: require("./postController"),
  likeController: require("./likeController"),
  commentController: require("./commentController")
};

TEMPLATE postController.js

const Models = require("../models");

// GET all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find().populate("UserID"); //Populate allows you to JOIN these related documents in a single query.
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Models.Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a post
exports.updatePost = async (req, res) => {
  try {
    const updated = await Models.Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated", data: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a post
exports.deletePost = async (req, res) => {
  try {
    const deleted = await Models.Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



8.test in postman

8.1 Test GET POST
Then in Postman:
Method: GET
URL: http://localhost:3000/api/posts
Click Send
You should see an array of posts.

8.2 Test POST
Method: POST
URL: http://localhost:3000/api/posts/create
Body → raw → JSON
Paste:

{
  "Title": "My first post",
  "Description": "Testing with Postman",
  "ImageURL": "https://example.com/image.jpg",
  "UserID": "6754abcd1234567890abcd12"
}

//copy the id from the response, we will use it: 69282b5c0123c2d664fb5324

8.3 TEST PUT
PUT
url http://localhost:3000/api/posts/69282b5c0123c2d664fb5324 //see the id from above
In headers write: Content-Type in Key and application/json in Value //Informs the server that the body data is JSON, so Express can read it properly.
In Body select raw and write:
{
  "Title": "My updated title",
  "Description": "Updated description"
}

8.4 TEST DELETE
DELETE
url : http://localhost:3000/api/posts/69282b5c0123c2d664fb5324
message will show post deleted successfully