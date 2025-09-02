import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/slices/categorySlice';
import api from '../../services/api';

const CategoriesPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    slug: '', 
    active: true,
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.admin.categories.list();
      setItems(res.data || res || []);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load();
  }, []);

  const startCreate = () => {
    setEditing({});
    setForm({ 
      name: '', 
      slug: '', 
      active: true,
      sort_order: 0
    });
  };

  const startEdit = (cat) => {
    setEditing(cat);
    setForm({ 
      name: cat.name || '', 
      slug: cat.slug || '', 
      active: cat.active !== false,
      sort_order: cat.sort_order || 0
    });
  };

  const save = async () => {
    if (!form.name || !form.slug) {
      alert('Vui lòng nhập tên và slug danh mục');
      return;
    }
    
    try {
      setSaving(true);
      if (editing?.id) {
        await api.admin.categories.update(editing.id, form);
      } else {
        await api.admin.categories.create(form);
      }
      await load();
      // Cập nhật Redux store để frontend customer cũng cập nhật
      dispatch(fetchCategories());
      setEditing(null);
      setForm({ name: '', slug: '', active: true, sort_order: 0 });
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Xóa danh mục này? Sản phẩm trong danh mục sẽ bị ảnh hưởng.')) return;
    try {
      await api.admin.categories.remove(id);
      await load();
      // Cập nhật Redux store để frontend customer cũng cập nhật
      dispatch(fetchCategories());
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleActive = async (id, currentActive) => {
    try {
      await api.admin.categories.update(id, { active: !currentActive });
      await load();
      // Cập nhật Redux store để frontend customer cũng cập nhật
      dispatch(fetchCategories());
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Quản lý danh mục</h2>
        <button onClick={startCreate} className="btn-primary px-3 py-2 text-sm rounded">
          <i className="fas fa-plus mr-2"></i>
          Thêm danh mục
        </button>
      </div>

      {/* Form */}
      {(editing !== null) && (
        <div className={`mb-6 rounded-xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editing?.id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tên danh mục *</label>
              <input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Nhập tên danh mục"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Slug *</label>
              <input 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="ten-danh-muc"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Thứ tự sắp xếp</label>
              <input 
                type="number" 
                value={form.sort_order} 
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value || 0) })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Trạng thái</label>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={form.active} 
                  onChange={(e) => setForm({ ...form, active: e.target.checked })} 
                  className="mr-2"
                />
                <span className="text-sm">Kích hoạt</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={saving} onClick={save} className="btn-primary px-6 py-2 rounded">
              {saving ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Đang lưu...</>) : 'Lưu danh mục'}
            </button>
            <button 
              onClick={() => { 
                setEditing(null); 
                setForm({ name: '', slug: '', active: true, sort_order: 0 }); 
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
                <th className="text-left px-4 py-3">Tên</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">Thứ tự</th>
                <th className="text-left px-4 py-3">Trạng thái</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((cat, idx) => (
                <tr key={cat.id} className={`${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} ${idx % 2 === 0 ? '' : darkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-2">{cat.id}</td>
                  <td className="px-4 py-2 font-medium">{cat.name}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{cat.slug}</td>
                  <td className="px-4 py-2">{cat.sort_order || 0}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => toggleActive(cat.id, cat.active)}
                      className={`px-2 py-1 rounded text-xs ${cat.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                    >
                      {cat.active ? 'Đang hoạt động' : 'Đã ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => startEdit(cat)} className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => remove(cat.id)} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
