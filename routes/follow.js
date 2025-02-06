const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isValidUser = require("../middleware");

// Get the users the logged-in user is following
router.get("/follow", isValidUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following", "name");
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users except the logged-in user
router.get("/users", isValidUser, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("name");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Follow a user
router.post("/follow/:id", isValidUser, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
    }

    res.json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Unfollow a user
router.post("/unfollow/:id", isValidUser, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
