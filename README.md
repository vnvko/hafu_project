# Hashtag E-commerce Project

Dự án website bán hashtag với giao diện hiện đại và đầy đủ chức năng quản trị.

## 🚀 Cách chạy dự án

### Backend (Node.js + Express + MySQL)

1. **Cài đặt dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Cấu hình database:**
   - Tạo file `.env` trong thư mục `backend/` với nội dung:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=hafu
   DB_PORT=3306
   JWT_SECRET=dev-secret-key-change-in-production
   JWT_EXPIRES_IN=7d
   PORT=5000
   NODE_ENV=development
   ```

3. **Import database:**
   - Sử dụng file `hafu.sql` để tạo database và bảng

4. **Chạy server:**
   ```bash
   npm start
   # hoặc
   npm run dev
   ```

### Frontend (React + Vite + Tailwind CSS)

1. **Cài đặt dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Chạy development server:**
   ```bash
   npm run dev
   ```

## 📁 Cấu trúc dự án

```
hashtag-ecommerce/
├── backend/                 # Backend API
│   ├── controllers/         # Controllers xử lý logic
│   ├── models/             # Models tương tác database
│   ├── routes/             # Định nghĩa API routes
│   ├── middlewares/        # Middlewares xác thực, phân quyền
│   ├── config/             # Cấu hình database
│   └── uploads/            # Thư mục lưu file upload
├── frontend/                # Frontend React
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Các trang của ứng dụng
│   │   ├── store/          # Redux store và slices
│   │   ├── services/       # API services
│   │   └── styles/         # CSS và Tailwind
│   └── public/             # Static files
└── hafu.sql                # Database schema
```

## 🔧 Tính năng chính

### Khách hàng
- ✅ Trang chủ với slider và sản phẩm nổi bật
- ✅ Danh mục sản phẩm động
- ✅ Trang sản phẩm với filter và search
- ✅ Giỏ hàng và đặt hàng
- ✅ Blog và tin tức
- ✅ Trang liên hệ với map
- ✅ Dark mode và responsive design

### Admin
- ✅ Dashboard với thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục (CRUD)
- ✅ Quản lý người dùng (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Quản lý blog
- ✅ Upload ảnh
- ✅ Phân quyền người dùng

## 🗄️ Database

- **MySQL** với các bảng chính:
  - `users` - Người dùng
  - `roles` - Vai trò
  - `user_roles` - Phân quyền
  - `categories` - Danh mục
  - `products` - Sản phẩm
  - `product_variants` - Biến thể sản phẩm
  - `orders` - Đơn hàng
  - `order_items` - Chi tiết đơn hàng
  - `blog_posts` - Bài viết blog
  - `carts` - Giỏ hàng

## 🔐 Authentication & Authorization

- **JWT** cho xác thực
- **Role-based access control** (ADMIN, USER)
- **Protected routes** cho admin panel

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS
- Dark mode support
- Smooth animations

## 🚀 Deployment

### Backend
- Sử dụng `PM2` hoặc `Docker`
- Cấu hình `NODE_ENV=production`
- Sử dụng database production

### Frontend
- Build với `npm run build`
- Deploy lên `Netlify`, `Vercel` hoặc `AWS S3`

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Port 5000 đã được sử dụng:**
   ```bash
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **Database connection failed:**
   - Kiểm tra MySQL service
   - Kiểm tra thông tin kết nối trong `.env`

3. **Upload ảnh không được:**
   - Kiểm tra thư mục `uploads/` có tồn tại
   - Kiểm tra quyền ghi file

## 📞 Liên hệ

- **Email:** info@hashtagshop.com
- **Hotline:** 0123.456.789
- **Website:** https://hashtagshop.com

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.