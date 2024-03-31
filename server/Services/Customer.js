const Customer = require('../Models/Customer.model')

exports.getAllCustomers = async () => {
    return await Customer.find();
};
exports.createCustomer = async (data) => {
  return await Customer.create(data);
};
exports.getCustomerById = async (id) => {
  return await Customer.findById(id);
};
 
exports.updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data);
};
 
exports.deleteCustomer= async (id) => {
  return await Customer.findByIdAndDelete(id);
};
