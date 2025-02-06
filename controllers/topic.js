const Topic = require("../models/topic");

//get all the topics
const getTopics = async () => {
  const topics = await Topic.find();
  return topics;
};

//get topic by id
const getTopic = async (id) => {
  const topic = await Topic.findById(id);
  return topic;
};

//add topic
const addNewTopic = async (name) => {
  const newTopic = new Topic({
    name,
  });
  await newTopic.save();
  return newTopic;
};

//update topic
const updateTopic = async (id, name) => {
  const updatedTopic = await Topic.findByIdAndUpdate(
    id,
    {
      name,
    },
    { new: true }
  );
  return updatedTopic;
};

//delete topic
const deleteTopic = async (id) => {
  return await Topic.findByIdAndDelete(id);
};

module.exports = {
  getTopics,
  getTopic,
  addNewTopic,
  updateTopic,
  deleteTopic,
};
