const RoleList = require('../Models/RoleList.model')
var createError = require('http-errors')

exports.getAllRoleList = async () => {
    return await RoleList.find();
};
exports.createRoleList = async (data) => {
  const exists = await RoleList.findOne({
    name: { $regex: `^${data.name}$`, $options: 'i' }
  });
  if(exists) {
    throw new createError(409, "Role already exists")
  }
  return await RoleList.create(data);
};
exports.getRoleListById = async (id) => {
  return await RoleList.findById(id);
};
 
exports.updateRoleList = async (id, data) => {
  return await RoleList.findByIdAndUpdate(id, data);
};
 
exports.deleteRoleList = async (id) => {
  return await RoleList.findByIdAndUpdate(id, {
    deletedAt: true
  });
};
exports.getRoleListByName = async (data) => {
    return await RoleList.find({name: data.name});
};
