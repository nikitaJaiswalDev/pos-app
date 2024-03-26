const Category = require('../Models/Category.model')

exports.getAllCategories = async () => {
    return await Category.find();
};
exports.createCategory = async (data) => {
  return await Category.create(data);
};
exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};
 
exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data);
};
 
exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};
