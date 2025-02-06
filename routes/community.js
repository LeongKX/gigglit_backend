const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const {
  getCommunities,
  getCommunity,
  addNewCommunity,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/community");

//get all communties
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const description = req.query.description;
    const communties = await getCommunities(name, description);
    res.status(200).send(communties);
  } catch (error) {
    res.status(400).send(error, _message);
  }
});

//get community by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const community = await getCommunity(id);
    res.status(200).send(community);
  } catch (error) {
    res.status(400).end(error._message);
  }
});

//add community
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;

    if (!name || !description) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }
    const newCommunity = await addNewCommunity(name, description);
    res.status(200).send(newCommunity);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//update community
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;

    const updatedCommunity = await updateCommunity(id, name, description);
    res.status(200).send(updatedCommunity);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//delete community
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCommunity = await deleteCommunity(id);
    res.status(200).send({
      message: `Community with the provide id #${id} has been deleted`,
    });
    return deletedCommunity;
  } catch (error) {
    res.status(400).send(error._message);
  }
});

module.exports = router;
