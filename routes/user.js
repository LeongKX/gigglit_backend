const express = require("express");
const router = express.Router();

const { login, signup, followUser } = require("../controllers/user");
const { isValidUser } = require("../middleware/auth");
const User = require("../models/user");

/*
    2 routes:
    POST /login
    POST /signup
*/

//get all users
router.get("/", isValidUser, async (req, res) => {
  try {
    const users = await User.find();
    if (users) res.status(200).json(users);
    return;
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //create new user via login functiom
    const user = await login(email, password);
    //send back the  user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//signup route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //create new user via signup functiom
    const user = await signup(name, email, password);
    //send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Follow a user
router.put("/follow/:id", isValidUser, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id); // The user you want to follow
    const currentUser = await User.findById(req.user.id); // The logged-in user

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const changedUser = followUser(userToFollow, currentUser);

    return res
      .status(200)
      .json({ changedUser, message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unfollow a user
router.put("/unfollow/:id", isValidUser, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userToUnfollow.followers.includes(req.user.id)) {
      return res.status(400).json({ message: "You don't follow this user" });
    }

    // Remove from followers and following
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user.id
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== req.params.id
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
