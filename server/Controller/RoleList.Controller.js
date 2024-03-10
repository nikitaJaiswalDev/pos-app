const createError = require("http-errors");
const RoleListService = require("../Services/RoleList");
const RoleList = require('../Models/RoleList.model')
const jwt = require('jsonwebtoken');

exports.getAllRoleList = async (req, res, next) => {
  try {
    const roles = await RoleListService.getAllRoleList();
    res.json({ data: roles, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createRoleList = async (req, res, next) => {
    try {
        const doesExists = await RoleListService.getRoleListByName(req.body)
        if(doesExists.length > 0) throw createError.Conflict(`${req.body.name} already exixts`)
        const roles = await RoleListService.createRoleList(req.body);
        res.json({ message: "Role Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getRoleListById = async (req, res, next) => {
  try {
    const role = await RoleListService.getRoleListById(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ data: role, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateRoleList = async (req, res, next) => {
  try {
    const role = await RoleListService.updateRoleList(req.params.id, req.body);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteRoleList = async (req, res, next) => {
  try {
    const role = await RoleListService.deleteRoleList(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getSpecificRole = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    
    const roleName = decodedToken.role;
    const roles = await RoleListService.getAllRoleList();
    
    // Filter to get only the roles matching the role name in the token
    const specificRole = roles.filter(role => role.name === roleName);

    const filteredData = specificRole.map(item => {
      return {
        roles: item.roles.filter(role => role.status), // Filter roles with status true
        _id: item._id,
        name: item.name,
        status: item.status
      }
    });
    res.json({ data: filteredData, status: "success" });
  } catch (err) {
    next(err)
  }
   
}