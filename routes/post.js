const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const {
  getPosts,
  getPost,
  addNewPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getPostsByUser,
} = require("../controllers/post");

const { isValidUser } = require("../middleware/auth");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//get post by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPost(id);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//get posts by user (followed accounts)
router.get("/:id/user", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostsByUser(id);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//add post
router.post("/", isValidUser, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const topic = req.body.topic;

    if (!title || !description || !topic) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }
    const newPost = await addNewPost(req.user._id, title, description, topic);
    res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(400).send(error._message);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const topic = req.body.topic;

    const updatedPost = await updatePost(id, title, description, topic);
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await deletePost(id);
    res.status(200).send({
      message: `Post with the provide id #${id} has been deleted`,
    });
    return deletedPost;
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//liked
router.put("/:id/like", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user._id;
    const updatedPost = await likePost(id, user);
    res.status(200).send(updatedPost);
    return updatedPost;
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//get all liked
router.get("/:id/like", async (req, res) => {
  try {
    const likes = await getLikes();
    res.status(200).send(likes);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//disliked
router.put("/:id/dislike", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user._id;
    const updatedPost = await dislikePost(id, user);
    res.status(200).send(updatedPost);
    return updatedPost;
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//get all disliked
router.get("/:id/dislike", async (req, res) => {
  try {
    const dislikes = await getDislikes();
    res.status(200).send(dislikes);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

module.exports = router;
