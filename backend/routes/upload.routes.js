const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middlewares/auth.middleware');
const { hasRole } = require('../middlewares/role.middleware');

// Đảm bảo thư mục uploads tồn tại
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình lưu file vào thư mục uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Đổi tên file để tránh trùng
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Cấu hình multer với giới hạn kích thước file
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép upload ảnh
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép upload file ảnh'), false);
    }
  }
});

// Middleware xử lý lỗi upload
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        message: 'File quá lớn. Kích thước tối đa là 10MB' 
      });
    }
    return res.status(400).json({ 
      message: 'Lỗi upload file', 
      error: err.message 
    });
  }
  
  if (err.message === 'Chỉ cho phép upload file ảnh') {
    return res.status(400).json({ 
      message: err.message 
    });
  }
  
  next(err);
};

// ✅ API: POST /api/upload/image (admin only)
router.post('/image', verifyToken, hasRole('ADMIN'), upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được upload' });
    }

    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({ message: 'Lỗi lưu file' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({ 
      message: 'Upload thành công', 
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Lỗi upload:', error);
    res.status(500).json({ message: 'Lỗi server khi upload file' });
  }
});

// ✅ API: POST /api/upload (admin only) - fallback
router.post('/', verifyToken, hasRole('ADMIN'), upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được upload' });
    }

    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({ message: 'Lỗi lưu file' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({ 
      message: 'Upload thành công', 
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Lỗi upload:', error);
    res.status(500).json({ message: 'Lỗi server khi upload file' });
  }
});

module.exports = router;

