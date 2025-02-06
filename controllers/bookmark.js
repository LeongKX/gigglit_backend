const Post = require("../models/post");
const Bookmark = require("../models/bookmark");

const getBookMark = async (userId) => {
  try {
    const bookmark = await Bookmark.findOne({ user: userId });
    if (!bookmark) {
      const newBookmark = await Bookmark.create({
        user: userId,
        posts: [],
      });

      return await newBookmark.populate("posts");
    }
    return bookmark.populate("posts");
  } catch (error) {
    throw new Error(error);
  }
};

const addToBookmark = async (postId, userId) => {
  try {
    const bookmark = await getBookMark(userId);

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const postIndex = bookmark.posts.findIndex(
      (post) => post._id.toString() === postId
    );

    if (postIndex !== -1) {
      bookmark.posts.splice(postIndex, 1);
    } else {
      bookmark.posts.push(post);
    }
    await bookmark.save();
    return bookmark;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getBookMark, addToBookmark };
