const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  try {
    const rows = await Category.getAllCategories();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err.message });
  }
};

// ✅ Admin: Lấy tất cả categories với pagination
const adminGetAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'created_desc' } = req.query;
    const result = await Category.adminGetAllCategories({ page, limit, sort });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err.message });
  }
};

// ✅ Admin: Tạo category mới
const adminCreateCategory = async (req, res) => {
  try {
    const { name, slug, active = true, sort_order = 0 } = req.body;
    
    if (!name || !slug) {
      return res.status(400).json({ message: 'Tên và slug là bắt buộc' });
    }

    const result = await Category.createCategory({ name, slug, active, sort_order });
    res.status(201).json({ message: 'Tạo danh mục thành công', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: err.message });
  }
};

// ✅ Admin: Cập nhật category
const adminUpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, active, sort_order } = req.body;
    
    const result = await Category.updateCategory(id, { name, slug, active, sort_order });
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }
    
    res.json({ message: 'Cập nhật danh mục thành công', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: err.message });
  }
};

// ✅ Admin: Xóa category
const adminDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Category.deleteCategory(id);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }
    
    res.json({ message: 'Xóa danh mục thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: err.message });
  }
};

module.exports = {
  getAllCategories,
  adminGetAllCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory
};
