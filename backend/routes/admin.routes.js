const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// Import controllers
const ProductController = require('../controllers/product.controller');
const CategoryController = require('../controllers/category.controller');
const UserController = require('../controllers/user.controller');
const RoleController = require('../controllers/role.controller');
const OrderController = require('../controllers/order.controller');
const BlogController = require('../controllers/blog.controller');

// API test quyền ADMIN
router.get('/dashboard', verifyToken, hasRole('ADMIN'), (req, res) => {
  res.json({ message: '🔐 Chào Admin! Bạn có quyền truy cập dashboard.' });
});

// ✅ Admin Products CRUD
router.get('/products', verifyToken, hasRole('ADMIN'), ProductController.adminGetAllProducts);
router.post('/products', verifyToken, hasRole('ADMIN'), ProductController.adminCreateProduct);
router.put('/products/:id', verifyToken, hasRole('ADMIN'), ProductController.adminUpdateProduct);
router.delete('/products/:id', verifyToken, hasRole('ADMIN'), ProductController.adminDeleteProduct);

// ✅ Admin Categories CRUD
router.get('/categories', verifyToken, hasRole('ADMIN'), CategoryController.adminGetAllCategories);
router.post('/categories', verifyToken, hasRole('ADMIN'), CategoryController.adminCreateCategory);
router.put('/categories/:id', verifyToken, hasRole('ADMIN'), CategoryController.adminUpdateCategory);
router.delete('/categories/:id', verifyToken, hasRole('ADMIN'), CategoryController.adminDeleteCategory);

// ✅ Admin Users CRUD
router.get('/users', verifyToken, hasRole('ADMIN'), UserController.adminGetAllUsers);
router.post('/users', verifyToken, hasRole('ADMIN'), UserController.adminCreateUser);
router.put('/users/:id', verifyToken, hasRole('ADMIN'), UserController.adminUpdateUser);
router.delete('/users/:id', verifyToken, hasRole('ADMIN'), UserController.adminDeleteUser);

// ✅ Admin Roles CRUD
router.get('/roles', verifyToken, hasRole('ADMIN'), RoleController.adminGetAllRoles);
router.post('/roles', verifyToken, hasRole('ADMIN'), RoleController.adminCreateRole);
router.put('/roles/:id', verifyToken, hasRole('ADMIN'), RoleController.adminUpdateRole);
router.delete('/roles/:id', verifyToken, hasRole('ADMIN'), RoleController.adminDeleteRole);

// ✅ Admin Orders CRUD
router.get('/orders', verifyToken, hasRole('ADMIN'), OrderController.adminGetAllOrders);
router.get('/orders/:id', verifyToken, hasRole('ADMIN'), OrderController.adminGetOrderDetail);
router.put('/orders/:id/status', verifyToken, hasRole('ADMIN'), OrderController.adminUpdateOrderStatus);

// ✅ Admin Blog CRUD
router.get('/blog', verifyToken, hasRole('ADMIN'), BlogController.adminGetAllPosts);
router.post('/blog', verifyToken, hasRole('ADMIN'), BlogController.adminCreatePost);
router.put('/blog/:id', verifyToken, hasRole('ADMIN'), BlogController.adminUpdatePost);
router.delete('/blog/:id', verifyToken, hasRole('ADMIN'), BlogController.adminDeletePost);

module.exports = router;
