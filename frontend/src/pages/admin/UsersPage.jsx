import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const UsersPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const [items, setItems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    email: '', 
    full_name: '', 
    phone: '',
    status: 'ACTIVE',
    roles: []
  });
  const [saving, setSaving] = useState(false);

  const load = async (p = 1) => {
    try {
      setLoading(true);
      const res = await api.admin.users.list({ page: p, limit: 10 });
      setItems(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const res = await api.admin.roles.list();
      setRoles(res || []);
    } catch (e) {
      console.error('Lỗi tải roles:', e);
    }
  };

  useEffect(() => { 
    load(page);
    loadRoles();
  }, [page]);

  const startCreate = () => {
    setEditing({});
    setForm({ 
      email: '', 
      full_name: '', 
      phone: '',
      status: 'ACTIVE',
      roles: []
    });
  };

  const startEdit = (user) => {
    setEditing(user);
    setForm({ 
      email: user.email || '', 
      full_name: user.full_name || '', 
      phone: user.phone || '',
      status: user.status || 'ACTIVE',
      roles: user.roles || []
    });
  };

  const save = async () => {
    if (!form.email || !form.full_name) {
      alert('Vui lòng nhập email và họ tên');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Email không hợp lệ');
      return;
    }
    
    try {
      setSaving(true);
      if (editing?.id) {
        await api.admin.users.update(editing.id, form);
        alert('Cập nhật người dùng thành công!');
      } else {
        await api.admin.users.create(form);
        alert('Tạo người dùng thành công!');
      }
      await load(page);
      setEditing(null);
      setForm({ email: '', full_name: '', phone: '', status: 'ACTIVE', roles: [] });
    } catch (e) {
      console.error('Lỗi lưu user:', e);
      alert('Lỗi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Xóa người dùng này?')) return;
    try {
      await api.admin.users.remove(id);
      await load(page);
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
      await api.admin.users.update(id, { status: newStatus });
      await load(page);
    } catch (e) {
      alert(e.message);
    }
  };

  const getRoleNames = (roleIds) => {
    if (!Array.isArray(roleIds)) return 'Chưa phân quyền';
    return roleIds.map(id => {
      const role = roles.find(r => r.id === id);
      return role ? role.name : 'Unknown';
    }).join(', ') || 'Chưa phân quyền';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'ACTIVE': { color: 'bg-green-100 text-green-800', text: 'Hoạt động' },
      'SUSPENDED': { color: 'bg-red-100 text-red-800', text: 'Tạm khóa' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Quản lý người dùng</h2>
        <button onClick={startCreate} className="btn-primary px-3 py-2 text-sm rounded">
          <i className="fas fa-plus mr-2"></i>
          Thêm người dùng
        </button>
      </div>

      {/* Form */}
      {(editing !== null) && (
        <div className={`mb-6 rounded-xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editing?.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <input 
                type="email"
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="user@example.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Họ tên *</label>
              <input 
                value={form.full_name} 
                onChange={(e) => setForm({ ...form, full_name: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Nguyễn Văn A"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Số điện thoại</label>
              <input 
                value={form.phone} 
                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="0901234567"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Trạng thái</label>
              <select 
                value={form.status} 
                onChange={(e) => setForm({ ...form, status: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="ACTIVE">Đang hoạt động</option>
                <option value="SUSPENDED">Tạm khóa</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Phân quyền</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {roles.map(role => (
                <label key={role.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={form.roles.includes(role.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, roles: [...form.roles, role.id] });
                      } else {
                        setForm({ ...form, roles: form.roles.filter(id => id !== role.id) });
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{role.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={saving} onClick={save} className="btn-primary px-6 py-2 rounded">
              {saving ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Đang lưu...</>) : 'Lưu người dùng'}
            </button>
            <button 
              onClick={() => { 
                setEditing(null); 
                setForm({ email: '', full_name: '', phone: '', status: 'ACTIVE', roles: [] }); 
              }} 
              className={`px-6 py-2 rounded ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-10 text-center">
          <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto"></div>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Đang tải...</p>
        </div>
      ) : error ? (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <i className="fas fa-exclamation-triangle mr-2"></i>{error}
        </div>
      ) : (
        <div className={`rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
              <tr className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">Thông tin</th>
                <th className="text-left px-4 py-3">Quyền hạn</th>
                <th className="text-left px-4 py-3">Trạng thái</th>
                <th className="text-left px-4 py-3">Ngày tạo</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user, idx) => (
                <tr key={user.id} className={`${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} ${idx % 2 === 0 ? '' : darkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-xs opacity-60">{user.email}</div>
                      {user.phone && <div className="text-xs opacity-60">{user.phone}</div>}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-xs">
                      {getRoleNames(user.roles)}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-2 text-xs opacity-60">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => startEdit(user)} className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => toggleStatus(user.id, user.status)}
                      className={`px-2 py-1 rounded ${user.status === 'ACTIVE' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                      title={user.status === 'ACTIVE' ? 'Tạm khóa' : 'Kích hoạt'}
                    >
                      <i className={`fas ${user.status === 'ACTIVE' ? 'fa-lock' : 'fa-unlock'}`}></i>
                    </button>
                    <button onClick={() => remove(user.id)} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button disabled={page === 1} onClick={() => setPage((v) => Math.max(1, v - 1))} className={`px-3 py-1.5 rounded border ${darkMode ? 'border-gray-700 text-gray-300 disabled:opacity-50' : 'border-gray-300 text-gray-700 disabled:opacity-50'}`}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Trang {page}/{totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((v) => Math.min(totalPages, v + 1))} className={`px-3 py-1.5 rounded border ${darkMode ? 'border-gray-700 text-gray-300 disabled:opacity-50' : 'border-gray-300 text-gray-700 disabled:opacity-50'}`}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
