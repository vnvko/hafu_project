const Role = require('../models/role.model');

// ✅ Admin: Lấy tất cả roles
const adminGetAllRoles = async (req, res) => {
  try {
    const result = await Role.getAllRoles();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách quyền', error: err.message });
  }
};

// ✅ Admin: Tạo role mới
const adminCreateRole = async (req, res) => {
  try {
    const { code, name } = req.body;
    
    if (!code || !name) {
      return res.status(400).json({ message: 'Mã và tên quyền là bắt buộc' });
    }

    const result = await Role.createRole({ code, name });
    res.status(201).json({ message: 'Tạo quyền thành công', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo quyền', error: err.message });
  }
};

// ✅ Admin: Cập nhật role
const adminUpdateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;
    
    const result = await Role.updateRole(id, { code, name });
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy quyền' });
    }
    
    res.json({ message: 'Cập nhật quyền thành công', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật quyền', error: err.message });
  }
};

// ✅ Admin: Xóa role
const adminDeleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Role.deleteRole(id);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy quyền' });
    }
    
    res.json({ message: 'Xóa quyền thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa quyền', error: err.message });
  }
};

module.exports = {
  adminGetAllRoles,
  adminCreateRole,
  adminUpdateRole,
  adminDeleteRole
};
