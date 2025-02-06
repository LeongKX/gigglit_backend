const Community = require("../models/community");

//get all coomunity
const getCommunities = async () => {
  const communities = await Community.find();
  return communities;
};

//get community by id
const getCommunity = async (id) => {
  const community = await Community.findById(id);
  return community;
};

//add community
const addNewCommunity = async (name, description) => {
  const newCommunity = new Community({
    name,
    description,
  });
  await newCommunity.save();
  return newCommunity;
};

//update community
const updateCommunity = async (id, name, description) => {
  const updatedCommunity = await Community.findByIdAndUpdate(
    id,
    {
      name,
      description,
    },
    { new: true }
  );
  return updatedCommunity;
};

//delete community
const deleteCommunity = async (id) => {
  return await Community.findByIdAndDelete(id);
};

module.exports = {
  getCommunities,
  getCommunity,
  addNewCommunity,
  updateCommunity,
  deleteCommunity,
};
