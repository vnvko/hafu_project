const db = require('../config/db');

// ✅ Admin: Lấy tất cả blog posts với pagination
const adminGetAllPosts = async ({ page = 1, limit = 10, status }) => {
  const offset = (page - 1) * limit;
  
  let whereClause = '';
  let params = [limit, offset];
  
  if (status) {
    whereClause = 'WHERE b.status = ?';
    params = [status, limit, offset];
  }
  
  const [rows] = await db.query(`
    SELECT b.id, b.title, b.slug, b.status, b.is_featured, b.created_at, b.updated_at,
           u.full_name as author_name
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    ${whereClause}
    ORDER BY b.created_at DESC
    LIMIT ? OFFSET ?
  `, params);
  
  const [countResult] = await db.query(
    `SELECT COUNT(*) as total FROM blog_posts b ${whereClause ? 'WHERE b.status = ?' : ''}`,
    status ? [status] : []
  );
  const total = countResult[0].total;
  
  return {
    data: rows,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      perPage: limit
    }
  };
};

// ✅ Tạo blog post mới
const createPost = async ({ title, slug, content, cover_url, is_featured, status, author_id }) => {
  const [result] = await db.query(`
    INSERT INTO blog_posts (title, slug, content, cover_url, is_featured, status, author_id, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ${status === 'PUBLISHED' ? 'CURRENT_TIMESTAMP' : 'NULL'})
  `, [title, slug, content, cover_url, is_featured, status, author_id]);
  
  return { id: result.insertId, title, slug, content, cover_url, is_featured, status };
};

// ✅ Cập nhật blog post
const updatePost = async (id, { title, slug, content, cover_url, is_featured, status }) => {
  const [result] = await db.query(`
    UPDATE blog_posts 
    SET title = ?, slug = ?, content = ?, cover_url = ?, is_featured = ?, status = ?, 
        published_at = ${status === 'PUBLISHED' ? 'CURRENT_TIMESTAMP' : 'NULL'},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [title, slug, content, cover_url, is_featured, status, id]);
  
  if (result.affectedRows === 0) return null;
  
  return { id, title, slug, content, cover_url, is_featured, status };
};

// ✅ Xóa blog post
const deletePost = async (id) => {
  const [result] = await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

// ✅ Customer: Lấy tất cả blog posts đã publish
const getAllPublishedPosts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  
  const [rows] = await db.query(`
    SELECT b.id, b.title, b.slug, b.content, b.cover_url, b.is_featured, b.created_at,
           u.full_name as author_name
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.status = 'PUBLISHED'
    ORDER BY b.is_featured DESC, b.published_at DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);
  
  const [countResult] = await db.query(
    'SELECT COUNT(*) as total FROM blog_posts WHERE status = "PUBLISHED"'
  );
  const total = countResult[0].total;
  
  return {
    data: rows,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      perPage: limit
    }
  };
};

// ✅ Customer: Lấy blog post theo slug
const getPostBySlug = async (slug) => {
  const [posts] = await db.query(`
    SELECT b.*, u.full_name as author_name
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.slug = ? AND b.status = 'PUBLISHED'
  `, [slug]);
  
  if (posts.length === 0) return null;
  
  return posts[0];
};

module.exports = {
  adminGetAllPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPublishedPosts,
  getPostBySlug
};
