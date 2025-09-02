const Cart = require('../models/cart.model');

const getCart = async (req, res) => {
  const { user_id } = req.query;
  try {
    const cartId = await Cart.getOrCreateCart(user_id);
    const items = await Cart.getCartItems(cartId);
    res.json({ cart_id: cartId, items });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy giỏ hàng', error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { user_id, variant_id, quantity } = req.body;
  try {
    const cartId = await Cart.getOrCreateCart(user_id);
    await Cart.addToCart(cartId, variant_id, quantity);
    res.json({ message: 'Đã thêm vào giỏ hàng' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi thêm vào giỏ', error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  const { item_id, quantity } = req.body;
  try {
    await Cart.updateCartItem(item_id, quantity);
    res.json({ message: 'Đã cập nhật giỏ hàng' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật', error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.removeCartItem(id);
    res.json({ message: 'Đã xoá sản phẩm khỏi giỏ' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xoá item', error: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
