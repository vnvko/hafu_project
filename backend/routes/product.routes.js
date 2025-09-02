const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// ẢNH SẢN PHẨM
router.get('/:id/images', ProductController.getProductImages);
router.post('/:id/images', verifyToken, hasRole('ADMIN'), ProductController.addProductImage);
router.delete('/images/:imageId', verifyToken, hasRole('ADMIN'), ProductController.deleteProductImage);

// SẢN PHẨM
router.get('/category/:slug', ProductController.getProductsByCategory);
router.get('/:slug', ProductController.getProductDetail);
router.get('/', ProductController.getAllProducts);

module.exports = router;
