const mongoose = require("mongoose");

const likeDislikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hasLiked: { type: Boolean, default: false },
    hasDisliked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LikeDislike", likeDislikeSchema);
