const ProfilePicture = require('../Models/ProfilePicture.model')

exports.createProPic = async (pic) => {
  return await ProfilePicture.create(pic);
};
exports.getProPicById = async (id) => {
  return await ProfilePicture.findById(id);
};
exports.deletePicById = async (id) => {
  return await ProfilePicture.findByIdAndDelete(id);
};