const Product = require('../Models/Product.model')

exports.getAllProducts = async (query) => {
    return await Product.find(query);
};
exports.createProduct = async (data) => {
  return await Product.create(data);
};
exports.getProductById = async (id) => {
  return await Product.findById(id);
};
 
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data);
};
 
exports.deleteProduct= async (id) => {
  return await Product.findByIdAndDelete(id);
};
