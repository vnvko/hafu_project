const Dashboard = require('../models/dashboard.model');

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Dashboard.getTotalOrders();
    const totalRevenue = await Dashboard.getTotalRevenue();
    const topProducts = await Dashboard.getTopSellingProducts();
    const revenueByDate = await Dashboard.getRevenueByDate();

    res.json({
      totalOrders,
      totalRevenue,
      topProducts,
      revenueByDate
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy thống kê', error: err.message });
  }
};

module.exports = { getDashboardStats };
