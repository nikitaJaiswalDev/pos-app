const Order = require('../Models/Order.model')

exports.getAllOrders = async (limit, skip) => {
  const totalCount = await Order.countDocuments();
  let query = Order.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let brands = await query;
  return {
    orders: brands, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createOrder = async (data) => {
  return await Order.create(data);
};
exports.getOrderById = async (id) => {
  return await Order.findById(id);
};
 
exports.updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data);
};
 
exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
