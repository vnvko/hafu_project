const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog.controller');
const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// ✅ Customer: Lấy tất cả bài viết đã publish
router.get('/', BlogController.getAllPublishedPosts);

// ✅ Customer: Lấy bài viết theo slug
router.get('/:slug', BlogController.getPostBySlug);

// ✅ Admin: Tạo bài viết mới
router.post('/', verifyToken, hasRole('ADMIN'), BlogController.adminCreatePost);

// ✅ Admin: Cập nhật bài viết
router.put('/:id', verifyToken, hasRole('ADMIN'), BlogController.adminUpdatePost);

// ✅ Admin: Xóa bài viết
router.delete('/:id', verifyToken, hasRole('ADMIN'), BlogController.adminDeletePost);

module.exports = router;

