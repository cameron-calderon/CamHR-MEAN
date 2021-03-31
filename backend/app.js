const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const checkAuth = require("./middleware/check-auth");

const UserRouters = require("./users");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Cameron:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.vjc0k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection to database has failed.");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  //checkAuth problem?
  const post = new Post({
    name: req.body.name,
    grossPay: req.body.grossPay,
    stateIncome: req.body.stateIncome,
    fedMarginalRate: req.body.fedMarginalRate,
    deferallRate: req.body.deferallRate,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added Successfully",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  // checkAuth problem?
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted." });
  });
});

app.use("/api/user", UserRouters);

module.exports = app;
