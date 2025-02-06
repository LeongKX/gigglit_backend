const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const {
  getTopics,
  getTopic,
  addNewTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic");

//get all topics
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const topics = await getTopics(name);
    res.status(200).send(topics);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//get topic by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const topic = await getTopic(id);
    res.status(200).send(topic);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//add topic
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }
    const newTopic = await addNewTopic(name);
    res.status(200).send(newTopic);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//update topic
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const updatedTopic = await updateTopic(id, name);
    res.status(200).send(updatedTopic);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//delete topic
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTopic = await deleteTopic(id);
    res.status(200).send({
      message: `Topic with the provide id #${id} has been deleted`,
    });
    return deletedTopic;
  } catch (error) {
    res.status(400).send(error._message);
  }
});

module.exports = router;
