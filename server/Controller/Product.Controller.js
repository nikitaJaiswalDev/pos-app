const createError = require("http-errors");
const ProductService = require("../Services/Product");

exports.getAllProducts = async (req, res, next) => {
  try {
    let query = {};
    const { category, text } = req.query;

    if (category !== 'undefined' && category !== 'null') {
      query.category = category;
    }
    if (text !== 'undefined' && text !== 'null') {
      query.$or = [
        { name: { $regex: text, $options: 'i' } },
        { sku: { $regex: text, $options: 'i' } }
      ];
    }
    const products = await ProductService.getAllProducts(query);
    res.json({ data: products, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createProduct = async (req, res, next) => {
    try {
      const { name, sku, brand, qtn, unit, unit_value, category, supplier, selling_price, purchase_price, discount, tax } = req.body
      const file = req.file
      await ProductService.createProduct({
          name,sku, brand, qtn, unit, unit_value, category, supplier, selling_price, purchase_price, discount, tax, 
          image: file.buffer,
      });
      res.json({ message: "Product Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if(!product) throw createError.NotFound()
    res.json({ data: product, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, sku, brand, qtn, unit, unit_value, category, supplier, selling_price, purchase_price, discount, tax } = req.body
    const file = req.file
    const product = await ProductService.updateProduct(req.params.id, {
      name,sku, brand, qtn, unit, unit_value, category, supplier, selling_price, purchase_price, discount, tax, 
      image: file.buffer,
    });
    if(!product) throw createError.NotFound()
    res.json({ message: "Product Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);
    if(!product) throw createError.NotFound()
    res.json({ message: "Product Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
