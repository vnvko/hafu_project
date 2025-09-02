const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get('/', (req, res) => {
  res.send('✅ HAFU API is running...');
});

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);

const orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);

const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart', cartRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);

const blogRoutes = require('./routes/blog.routes');
app.use('/api/blog', blogRoutes);

const uploadRoutes = require('./routes/upload.routes');
app.use('/api/upload', uploadRoutes);

// Cho phép truy cập ảnh tĩnh trong thư mục uploads
app.use('/uploads', express.static('uploads'));

// Dashboard
const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;
