import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const BlogPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    slug: '', 
    content: '',
    cover_url: '',
    is_featured: false,
    status: 'DRAFT'
  });
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (p = 1) => {
    try {
      setLoading(true);
      const res = await api.admin.blog.list({ page: p, limit: 10 });
      setItems(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(page);
  }, [page]);

  const startCreate = () => {
    setEditing({});
    setForm({ 
      title: '', 
      slug: '', 
      content: '',
      cover_url: '',
      is_featured: false,
      status: 'DRAFT'
    });
  };

  const startEdit = (post) => {
    setEditing(post);
    setForm({ 
      title: post.title || '', 
      slug: post.slug || '', 
      content: post.content || '',
      cover_url: post.cover_url || '',
      is_featured: post.is_featured || false,
      status: post.status || 'DRAFT'
    });
  };

  const save = async () => {
    if (!form.title || !form.slug) {
      alert('Vui lòng nhập tiêu đề và slug bài viết');
      return;
    }
    
    try {
      setSaving(true);
      if (editing?.id) {
        await api.admin.blog.update(editing.id, form);
      } else {
        await api.admin.blog.create(form);
      }
      await load(page);
      setEditing(null);
      setForm({ title: '', slug: '', content: '', cover_url: '', is_featured: false, status: 'DRAFT' });
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Xóa bài viết này?')) return;
    try {
      await api.admin.blog.remove(id);
      await load(page);
    } catch (e) {
      alert(e.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'DRAFT': { text: 'Bản nháp', class: 'bg-gray-500 text-white' },
      'PUBLISHED': { text: 'Đã xuất bản', class: 'bg-green-500 text-white' }
    };
    const config = statusConfig[status] || { text: status, class: 'bg-gray-500 text-white' };
    return (
      <span className={`px-2 py-1 rounded text-xs ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Quản lý bài viết</h2>
        <button onClick={startCreate} className="btn-primary px-3 py-2 text-sm rounded">
          <i className="fas fa-plus mr-2"></i>
          Thêm bài viết
        </button>
      </div>

      {/* Form */}
      {(editing !== null) && (
        <div className={`mb-6 rounded-xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editing?.id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tiêu đề *</label>
              <input 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Slug *</label>
              <input 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="tieu-de-bai-viet"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">URL ảnh bìa</label>
              <input 
                value={form.cover_url} 
                onChange={(e) => setForm({ ...form, cover_url: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Trạng thái</label>
              <select 
                value={form.status} 
                onChange={(e) => setForm({ ...form, status: e.target.value })} 
                className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="DRAFT">Bản nháp</option>
                <option value="PUBLISHED">Xuất bản</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Bài nổi bật</label>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={form.is_featured} 
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} 
                  className="mr-2"
                />
                <span className="text-sm">Đánh dấu nổi bật</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Nội dung</label>
            <textarea 
              value={form.content} 
              onChange={(e) => setForm({ ...form, content: e.target.value })} 
              rows={6}
              className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Nhập nội dung bài viết..."
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={saving} onClick={save} className="btn-primary px-6 py-2 rounded">
              {saving ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Đang lưu...</>) : 'Lưu bài viết'}
            </button>
            <button 
              onClick={() => { 
                setEditing(null); 
                setForm({ title: '', slug: '', content: '', cover_url: '', is_featured: false, status: 'DRAFT' }); 
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
                <th className="text-left px-4 py-3">Tiêu đề</th>
                <th className="text-left px-4 py-3">Trạng thái</th>
                <th className="text-left px-4 py-3">Nổi bật</th>
                <th className="text-left px-4 py-3">Ngày tạo</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((post, idx) => (
                <tr key={post.id} className={`${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} ${idx % 2 === 0 ? '' : darkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-2">{post.id}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs opacity-60">{post.slug}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-4 py-2">
                    {post.is_featured ? (
                      <span className="px-2 py-1 rounded text-xs bg-yellow-500 text-white">
                        Nổi bật
                      </span>
                    ) : (
                      <span className="text-xs opacity-60">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-xs opacity-60">
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => startEdit(post)} className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => remove(post.id)} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
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

export default BlogPage;
