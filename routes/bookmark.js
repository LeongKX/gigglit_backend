const express = require("express");
const router = express.Router();

const { isValidUser } = require("../middleware/auth");
const { getBookMark, addToBookmark } = require("../controllers/bookmark");

// Get user bookmarks
router.get("/", isValidUser, async (req, res) => {
  try {
    const bookmarks = await getBookMark(req.user._id);
    return res.status(200).json(bookmarks.posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add/remove a post from bookmarks
router.post("/:id", isValidUser, async (req, res) => {
  try {
    const bookmark = await addToBookmark(req.params.id, req.user._id);
    return res.status(200).json(bookmark);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
