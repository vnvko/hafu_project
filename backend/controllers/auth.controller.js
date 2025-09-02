const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async (req, res) => {
  const { email, password, full_name } = req.body;
  try {
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });

    const password_hash = await bcrypt.hash(password, 10);
    const userId = await User.createUserForAuth({ email, password_hash, full_name });
    res.status(201).json({ message: 'Đăng ký thành công', userId });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    let ok = false;
    try {
      ok = await bcrypt.compare(password, user.password_hash || '');
    } catch (_) {
      ok = false;
    }

    // Legacy fallback: nếu password_hash không phải bcrypt (không bắt đầu bằng "$2") và bằng plaintext
    if (!ok && user.password_hash && !String(user.password_hash).startsWith('$2') && password === user.password_hash) {
      ok = true;
    }

    if (!ok) return res.status(400).json({ message: 'Mật khẩu không đúng' });

    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.json({ message: 'Đăng nhập thành công', token, user: { id: user.id, email: user.email, full_name: user.full_name } });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// ⬇️  CUỐI FILE
module.exports = {
  register,
  login
};
