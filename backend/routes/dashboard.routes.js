const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');

const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// Chỉ Admin được xem thống kê
router.get('/', verifyToken, hasRole('ADMIN'), DashboardController.getDashboardStats);

module.exports = router;
