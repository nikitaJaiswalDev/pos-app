const Employee = require('../Models/Employee.model')

exports.getAllEmployees = async () => {
    return await Employee.find();
};
exports.createEmployee = async (employee) => {
  return await Employee.create(employee);
};
exports.getEmployeeById = async (id) => {
  return await Employee.findById(id);
};
 
exports.updateEmployee = async (id, employee) => {
  return await Employee.findByIdAndUpdate(id, employee);
};
 
exports.deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};