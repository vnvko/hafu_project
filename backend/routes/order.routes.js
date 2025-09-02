const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');

const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// ✅ Customer: Lấy đơn hàng của user
router.get('/', verifyToken, OrderController.getUserOrders);

// ✅ Customer: Lấy chi tiết đơn hàng
router.get('/:id', verifyToken, OrderController.getOrderDetail);

// ✅ Customer: Tạo đơn hàng mới
router.post('/', verifyToken, OrderController.createOrder);

// ✅ Admin: Cập nhật trạng thái đơn hàng
router.put('/:id/status', verifyToken, hasRole('ADMIN'), OrderController.adminUpdateOrderStatus);

module.exports = router;
