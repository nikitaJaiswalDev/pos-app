const Product = require('../Models/Product.model')
const Supplier = require('../Models/Supplier.model')

exports.getAllProducts = async (query, limit ,skip) => {
    const totalCount = await Product.countDocuments();
    let product_query = Product.find().sort({createdAt: -1});
    if (limit !== 'null') {
      product_query = product_query.limit(limit);
    }

    if (skip !== 'null') {
      product_query = product_query.skip(skip);
    }
    let products = await product_query;

    const productWithSupplierInfo = await Promise.all(products.map(async (product) => {
      // Fetch supplier information based on supplier ID stored in the product
      const supplier = await Supplier.findById(product.supplier);
      // Return product with supplier name attached
      return {
        ...product.toJSON(),
        supplierName: supplier ? supplier.name : ''
      };
    }));
   
    return {
      products: productWithSupplierInfo, 
      pagination: { 
        limit: limit || totalCount,
        skip: skip || 0,
        total: totalCount
      }
    }
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
