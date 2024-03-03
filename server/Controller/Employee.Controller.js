const createError = require("http-errors");
const employeeService = require("../Services/Employee");
const bcrypt = require('bcrypt')

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    const data = employees.map(employee => {
      const { password, __v, ...rest } = employee.toObject({ getters: true, virtuals: false });
      return rest;
    });
    res.json({ data: data, status: "success" });
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
    const { password } = req.body
    let updatedData = {...req.body}
    if(password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData = {...updatedData, password: hashedPassword}
    }
    const employee = await employeeService.updateEmployee(req.params.id, updatedData);
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
