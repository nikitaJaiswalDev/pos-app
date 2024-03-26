const Brand = require('../Models/Brand.model')

exports.getAllBrands = async () => {
    return await Brand.find();
};
exports.createBrand = async (data) => {
  return await Brand.create(data);
};
exports.getBrandById = async (id) => {
  return await Brand.findById(id);
};
 
exports.updateBrand = async (id, data) => {
  return await Brand.findByIdAndUpdate(id, data);
};
 
exports.deleteBrand= async (id) => {
  return await Brand.findByIdAndDelete(id);
};
