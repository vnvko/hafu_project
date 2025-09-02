const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');

router.get('/', CartController.getCart);
router.post('/add', CartController.addToCart);
router.put('/update', CartController.updateCartItem);
router.delete('/remove/:id', CartController.removeCartItem);

module.exports = router;
