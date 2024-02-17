const createError = require("http-errors");
const employeeService = require("../Services/Employee");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    console.log({ employees });
    res.json({ data: employees, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.json({ message: "Employee Added Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if(!employee) throw createError.NotFound()
    res.json({ data: employee, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    if(!employee) throw createError.NotFound()
    res.json({ message: "Employee Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if(!employee) throw createError.NotFound()
    res.json({ message: "Employee Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
