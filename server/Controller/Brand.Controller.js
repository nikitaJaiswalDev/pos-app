const createError = require("http-errors");
const BrandService = require("../Services/Brand");
const jwt = require('jsonwebtoken');

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandService.getAllBrands();
    res.json({ data: brands, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createBrand = async (req, res, next) => {
    try {
      await BrandService.createBrand({
          name: req.body.name,
          image: req.file.buffer,
      });
      res.json({ message: "Brand Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await BrandService.getBrandById(req.params.id);
    if(!brand) throw createError.NotFound()
    res.json({ data: brand, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const brand = await BrandService.updateBrand(req.params.id, {
        name: req.body.name,
        image: req.file.buffer,
    });
    if(!brand) throw createError.NotFound()
    res.json({ message: "Brand Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const brand = await BrandService.deleteBrand(req.params.id);
    if(!brand) throw createError.NotFound()
    res.json({ message: "Brand Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
