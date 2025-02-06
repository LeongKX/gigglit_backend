const Post = require("../models/post");
const User = require("../models/user");

//get all posts
const getPosts = async () => {
  const posts = await Post.find()
    .populate({ path: "topic" })
    .populate({ path: "user" });
  return posts;
};

//get post by id
const getPost = async (id) => {
  const post = await Post.findById(id);
  return post;
};

//get all posts by user
const getPostsByUser = async (id) => {
  const posts = await Post.find()
    .populate({ path: "topic" })
    .populate({ path: "user" });
  const user = await User.findById(id);
  const filteredPosts = []
  for (const followingUser of [...user.following.map((u)=>u.toString()), id]) {
    for (const post of posts) {
      if (post.user._id.toString() == followingUser){
        filteredPosts.push(post)
      }
    }
  }
  return filteredPosts;
};

//add post
const addNewPost = async (user, title, description, topic) => {
  const newPost = new Post({
    title,
    description,
    topic,
    user,
  });
  await newPost.save();
  return newPost;
};

//update post
const updatePost = async (id, title, description, topic) => {
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      description,
      topic,
    },
    { new: true }
  );
  return updatedPost;
};

//delete post
const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

// Like a post
const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  userId = userId.toString();
  const existingId = post.likes.find((id) => id.toString() === userId);
  if (!existingId) {
    post.likes.push(userId);
    post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
  } else {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
  }

  await post.save();
  return post;
};

// Dislike a post
const dislikePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  userId = userId.toString();
  const existingId = post.dislikes.find((id) => id.toString() === userId);
  if (!existingId) {
    post.dislikes.push(userId);
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  }

  await post.save();
  return post;
};

module.exports = {
  getPosts,
  getPost,
  addNewPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getPostsByUser
};
