const Unit = require('../Models/Unit.model')

exports.getAllUnits = async () => {
    return await Unit.find();
};
exports.createUnit = async (data) => {
  return await Unit.create(data);
};
exports.getUnitById = async (id) => {
  return await Unit.findById(id);
};
 
exports.updateUnit = async (id, data) => {
  return await Unit.findByIdAndUpdate(id, data);
};
 
exports.deleteUnit= async (id) => {
  return await Unit.findByIdAndDelete(id);
};
