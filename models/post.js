const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Post = model("Post", postSchema);
module.exports = Post;
