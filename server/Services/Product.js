const Product = require('../Models/Product.model')
const Supplier = require('../Models/Supplier.model')

exports.getAllProducts = async (query) => {
    const products = await Product.find(query);
    const productWithSupplierInfo = await Promise.all(products.map(async (product) => {
      // Fetch supplier information based on supplier ID stored in the product
      const supplier = await Supplier.findById(product.supplier);
      // Return product with supplier name attached
      return {
        ...product.toJSON(),
        supplierName: supplier ? supplier.name : ''
      };
    }));
    return productWithSupplierInfo;
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
