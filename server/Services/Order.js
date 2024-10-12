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

exports.getOrdersForCharts = async (type) => {
  const currentYear = new Date().getFullYear(); // Get the current year
  // Add a match condition to filter for orders created in the current year
  let match = {
    createdAt: {
      $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
      $lte: new Date(`${currentYear}-12-31T23:59:59Z`)
    }
  };

  let groupBy;
  
  if (type === "month") {
    groupBy = {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        count: { $sum: 1 }
      }
    };
  } else if (type === "week") {
    groupBy = {
      $group: {
        _id: { week: { $week: "$createdAt" }, year: { $year: "$createdAt" } },
        count: { $sum: 1 }
      }
    };
  } else {
    throw new Error("Invalid type. Use 'month' or 'week'.");
  }

  let orders = await Order.aggregate([
    { $match: match },
    groupBy,
    { $sort: { '_id.year': -1, '_id.month': -1, '_id.week': -1 } } // Sorting based on year, then month/week
  ]);

  return {
    orders,
  };
};


