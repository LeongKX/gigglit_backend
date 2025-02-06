const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookmarkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Bookmark = model("Bookmark", BookmarkSchema);
module.exports = Bookmark;
