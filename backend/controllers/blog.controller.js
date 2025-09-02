// backend/controllers/blog.controller.js
const db = require('../config/db');

/* ============== ADMIN: LIST POSTS (pagination + filter) ============== */
const adminGetAllPosts = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 10)));
    const status = (req.query.status || '').toUpperCase();
    const offset = (page - 1) * limit;

    const where = [];
    const params = [];
    if (status && ['DRAFT', 'PUBLISHED'].includes(status)) {
      where.push('b.status = ?'); params.push(status);
    }
    const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [[countRow]] = await db.query(`SELECT COUNT(*) AS total FROM blog_posts b ${whereSQL}`, params);
    const total = countRow.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const [rows] = await db.query(
      `
      SELECT 
        b.id, b.title, b.slug, b.content, b.cover_url, 
        b.is_featured, b.status, b.created_at,
        u.full_name AS author_name
      FROM blog_posts b
      LEFT JOIN users u ON u.id = b.author_id
      ${whereSQL}
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    return res.json({
      data: rows,
      pagination: { page, limit, total, totalPages }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err.message });
  }
};

/* ============== ADMIN: CREATE ============== */
const adminCreatePost = async (req, res) => {
  try {
    const { title, slug, content = '', cover_url = '', is_featured = false, status = 'DRAFT' } = req.body;
    if (!title || !slug) {
      return res.status(400).json({ message: 'Tiêu đề và slug là bắt buộc' });
    }
    const authorId = req.userId;

    const [ins] = await db.query(
      `INSERT INTO blog_posts (title, slug, content, cover_url, is_featured, status, author_id, created_at)
       VALUES (?,?,?,?,?,?,?, NOW())`,
      [title, slug, content, cover_url, !!is_featured, status.toUpperCase(), authorId]
    );

    return res.status(201).json({
      message: 'Tạo bài viết thành công',
      data: { id: ins.insertId, title, slug, content, cover_url, is_featured: !!is_featured, status: status.toUpperCase() }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi tạo bài viết', error: err.message });
  }
};

/* ============== ADMIN: UPDATE ============== */
const adminUpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, cover_url, is_featured, status } = req.body;

    await db.query(
      `UPDATE blog_posts
       SET 
         title = COALESCE(?, title),
         slug = COALESCE(?, slug),
         content = COALESCE(?, content),
         cover_url = COALESCE(?, cover_url),
         is_featured = COALESCE(?, is_featured),
         status = COALESCE(?, status)
       WHERE id = ?`,
      [title, slug, content, cover_url, 
       typeof is_featured === 'boolean' ? is_featured : null, 
       status ? status.toUpperCase() : null,
       id]
    );

    const [[post]] = await db.query(`SELECT * FROM blog_posts WHERE id = ?`, [id]);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

    return res.json({ message: 'Cập nhật bài viết thành công', data: post });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error: err.message });
  }
};

/* ============== ADMIN: DELETE ============== */
const adminDeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const [ret] = await db.query(`DELETE FROM blog_posts WHERE id = ?`, [id]);
    if (!ret.affectedRows) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
    return res.json({ message: 'Xóa bài viết thành công' });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi xóa bài viết', error: err.message });
  }
};

/* ============== PUBLIC: LIST PUBLISHED ============== */
const getAllPublishedPosts = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 10)));
    const offset = (page - 1) * limit;

    const [[countRow]] = await db.query(
      `SELECT COUNT(*) AS total FROM blog_posts WHERE status = 'PUBLISHED'`
    );
    const total = countRow.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const [rows] = await db.query(
      `
      SELECT id, title, slug, cover_url, is_featured, status, created_at
      FROM blog_posts
      WHERE status = 'PUBLISHED'
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    return res.json({ data: rows, pagination: { page, limit, total, totalPages } });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err.message });
  }
};

/* ============== PUBLIC: GET BY SLUG ============== */
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [[post]] = await db.query(
      `SELECT id, title, slug, content, cover_url, is_featured, status, created_at 
       FROM blog_posts 
       WHERE slug = ? AND status = 'PUBLISHED'
       LIMIT 1`,
      [slug]
    );
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err.message });
  }
};

module.exports = {
  adminGetAllPosts,
  adminCreatePost,
  adminUpdatePost,
  adminDeletePost,
  getAllPublishedPosts,
  getPostBySlug,
};
