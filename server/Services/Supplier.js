const Supplier = require('../Models/Supplier.model')

exports.getAllSuppliers = async () => {
    return await Supplier.find();
};
exports.createSupplier = async (data) => {
  return await Supplier.create(data);
};
exports.getSupplierById = async (id) => {
  return await Supplier.findById(id);
};
 
exports.updateSupplier = async (id, data) => {
  return await Supplier.findByIdAndUpdate(id, data);
};
 
exports.deleteSupplier = async (id) => {
  return await Supplier.findByIdAndDelete(id);
};
