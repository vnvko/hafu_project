const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const ProductController = require('../controllers/product.controller');

router.get('/', CategoryController.getAllCategories);
router.get('/:slug/products', ProductController.getProductsByCategory);

module.exports = router;
