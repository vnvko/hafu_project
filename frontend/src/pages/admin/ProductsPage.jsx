import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ProductsPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    slug: '', 
    price_min: 0, 
    thumbnail_url: '',
    description: '',
    category_id: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async (p = 1) => {
    try {
      setLoading(true);
      let res;
      try {
        res = await api.admin.products.list({ page: p, limit: 10, sort: 'created_desc' });
      } catch {
        res = await api.getAllProducts({ page: p, limit: 10, sort: 'created_desc' });
      }
      setItems(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.getCategories();
      setCategories(res || []);
    } catch (e) {
      console.error('Lỗi tải danh mục:', e);
    }
  };

  useEffect(() => { 
    load(page); 
    loadCategories();
  }, [page]);

  const startCreate = () => {
    setEditing({});
    setForm({ 
      name: '', 
      slug: '', 
      price_min: 0, 
      thumbnail_url: '',
      description: '',
      category_id: ''
    });
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ 
      name: p.name || '', 
      slug: p.slug || '', 
      price_min: Number(p.price_min) || 0, 
      thumbnail_url: p.thumbnail_url || '',
      description: p.description || '',
      category_id: p.category_id || ''
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation file
    if (!file.type.startsWith('image/')) {
      alert('Chỉ cho phép upload file ảnh');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert('File quá lớn. Kích thước tối đa là 10MB');
      return;
    }

    try {
      setUploading(true);
      const result = await api.admin.upload.image(file);
      setForm({ ...form, thumbnail_url: result.url });
      alert('Upload ảnh thành công!');
    } catch (e) {
      console.error('Lỗi upload:', e);
      alert('Lỗi upload: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.slug) {
      alert('Vui lòng nhập tên và slug sản phẩm');
      return;
    }
    
    try {
      setSaving(true);
      if (editing?.id) {
        await api.admin.products.update(editing.id, form);
      } else {
        await api.admin.products.create(form);
      }
      await load(page);
      setEditing(null);
      setForm({ name: '', slug: '', price_min: 0, thumbnail_url: '', description: '', category_id: '' });
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Xóa sản phẩm này?')) return;
    try {
      await api.admin.products.remove(id);
      await load(page);
    } catch (e) {
      alert(e.message);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Chưa phân loại';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Quản lý sản phẩm</h2>
        <button onClick={startCreate} className="btn-primary px-3 py-2 text-sm rounded">
          <i className="fas fa-plus mr-2"></i>
          Thêm sản phẩm
        </button>
      </div>

      {/* Form */}
      {(editing !== null) && (
        <div className={`mb-6 rounded-xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editing?.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tên sản phẩm *</label>
              <input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Slug *</label>
              <input 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="ten-san-pham"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Danh mục</label>
              <select 
                value={form.category_id} 
                onChange={(e) => setForm({ ...form, category_id: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Giá thấp nhất (VNĐ)</label>
              <input 
                type="number" 
                value={form.price_min} 
                onChange={(e) => setForm({ ...form, price_min: Number(e.target.value || 0) })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="0"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Mô tả</label>
            <textarea 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              rows="3"
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Mô tả chi tiết sản phẩm..."
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Ảnh sản phẩm</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input 
                  value={form.thumbnail_url} 
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} 
                  className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="Link ảnh (Google Drive, URL...)"
                />
              </div>
              <div className="flex-shrink-0">
                <label className={`px-4 py-2 rounded border cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>
                  <i className="fas fa-upload mr-2"></i>
                  {uploading ? 'Đang tải...' : 'Tải ảnh'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
            {form.thumbnail_url && (
              <div className="mt-2">
                <img src={form.thumbnail_url} alt="Preview" className="w-20 h-20 object-cover rounded border" />
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={saving} onClick={save} className="btn-primary px-6 py-2 rounded">
              {saving ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Đang lưu...</>) : 'Lưu sản phẩm'}
            </button>
            <button 
              onClick={() => { 
                setEditing(null); 
                setForm({ name: '', slug: '', price_min: 0, thumbnail_url: '', description: '', category_id: '' }); 
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
                <th className="text-left px-4 py-3">Ảnh</th>
                <th className="text-left px-4 py-3">Tên</th>
                <th className="text-left px-4 py-3">Danh mục</th>
                <th className="text-left px-4 py-3">Giá thấp nhất</th>
                <th className="text-left px-4 py-3">Đã bán</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p, idx) => (
                <tr key={p.id} className={`${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} ${idx % 2 === 0 ? '' : darkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">
                    {p.thumbnail_url ? (
                      <img src={p.thumbnail_url} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className={`w-12 h-12 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs opacity-60">{p.slug}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {getCategoryName(p.category_id)}
                    </span>
                  </td>
                  <td className="px-4 py-2">{Number(p.price_min || 0).toLocaleString('vi-VN')}đ</td>
                  <td className="px-4 py-2">{p.sold_count || 0}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => startEdit(p)} className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => remove(p.id)} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
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

export default ProductsPage;
