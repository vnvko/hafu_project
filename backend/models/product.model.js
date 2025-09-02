const db = require('../config/db');

const getAllProducts = async (
  page = 1,
  limit = 10,
  search = '',
  categorySlug = null,
  minPrice = 0,
  maxPrice = Number.MAX_SAFE_INTEGER,
  sort = 'created_desc'
) => {
  const offset = (page - 1) * limit;
  const keyword = `%${search}%`;

  const sortOptions = {
    'price_asc': 'p.price_min ASC',
    'price_desc': 'p.price_min DESC',
    'name_asc': 'p.name ASC',
    'name_desc': 'p.name DESC',
    'created_desc': 'p.created_at DESC',
    'created_asc': 'p.created_at ASC'
  };
  const sortBy = sortOptions[sort] || 'p.created_at DESC';

  const useJoin = !!categorySlug;
  const fromClause = useJoin
    ? `FROM products p JOIN product_categories pc ON pc.product_id = p.id JOIN categories c ON c.id = pc.category_id`
    : 'FROM products p';

  const whereClause = `
    WHERE p.is_active = 1
    AND (p.name LIKE ? OR p.slug LIKE ?)
    AND p.price_min BETWEEN ? AND ?
    ${categorySlug ? 'AND c.slug = ?' : ''}
  `;

  const queryParams = categorySlug
    ? [keyword, keyword, minPrice, maxPrice, categorySlug]
    : [keyword, keyword, minPrice, maxPrice];

  const [products] = await db.query(`
    SELECT p.id, p.slug, p.name, p.thumbnail_url, p.price_min, p.rating_avg, p.sold_count
    ${fromClause}
    ${whereClause}
    ORDER BY ${sortBy}
    LIMIT ? OFFSET ?
  `, [...queryParams, parseInt(limit), parseInt(offset)]);

  const [[{ total }]] = await db.query(`
    SELECT COUNT(*) AS total
    ${fromClause}
    ${whereClause}
  `, queryParams);

  return { products, total };
};

const getProductBySlug = async (slug) => {
  const [rows] = await db.query(
    'SELECT * FROM products WHERE slug = ? AND is_active = 1 LIMIT 1',
    [slug]
  );
  return rows[0];
};

const getProductsByCategorySlug = async (slug) => {
  const [rows] = await db.query(`
    SELECT p.id, p.slug, p.name, p.thumbnail_url, p.price_min, p.rating_avg, p.sold_count
    FROM products p
    JOIN product_categories pc ON pc.product_id = p.id
    JOIN categories c ON c.id = pc.category_id
    WHERE c.slug = ? AND p.is_active = 1
    ORDER BY p.created_at DESC
  `, [slug]);
  return rows;
};

const addProductImage = async ({ product_id, url, alt = '', sort = 0 }) => {
  const [result] = await db.query(
    `INSERT INTO product_images (product_id, url, alt, sort) VALUES (?, ?, ?, ?)`,
    [product_id, url, alt, sort]
  );
  return result.insertId;
};

const getProductImages = async (product_id) => {
  const [rows] = await db.query(
    `SELECT id, url, alt, sort FROM product_images WHERE product_id = ? ORDER BY sort ASC, id ASC`,
    [product_id]
  );
  return rows;
};

const deleteProductImage = async (image_id) => {
  await db.query(`DELETE FROM product_images WHERE id = ?`, [image_id]);
};

// Admin: create/update/delete
const createProduct = async ({ name, slug, price_min = 0, thumbnail_url = null, description = null, category_id = null }) => {
  const [result] = await db.query(
    `INSERT INTO products (slug, name, short_desc, description, thumbnail_url, price_min, rating_avg, sold_count, is_active)
     VALUES (?, ?, NULL, ?, ?, ?, 0, 0, 1)`,
    [slug, name, description, thumbnail_url, price_min]
  );
  
  const productId = result.insertId;
  
  // Thêm category nếu có
  if (category_id) {
    await db.query(
      `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
      [productId, category_id]
    );
  }
  
  return productId;
};

const updateProduct = async (id, { name, slug, price_min, thumbnail_url, description, category_id }) => {
  await db.query(
    `UPDATE products SET name = COALESCE(?, name), slug = COALESCE(?, slug), price_min = COALESCE(?, price_min), 
     thumbnail_url = COALESCE(?, thumbnail_url), description = COALESCE(?, description) WHERE id = ?`,
    [name ?? null, slug ?? null, price_min ?? null, thumbnail_url ?? null, description ?? null, id]
  );
  
  // Cập nhật category nếu có
  if (category_id !== undefined) {
    // Xóa category cũ
    await db.query(`DELETE FROM product_categories WHERE product_id = ?`, [id]);
    
    // Thêm category mới nếu có
    if (category_id) {
      await db.query(
        `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
        [id, category_id]
      );
    }
  }
};

const deleteProduct = async (id) => {
  // Soft delete để tránh lỗi khóa ngoại
  await db.query(`UPDATE products SET is_active = 0 WHERE id = ?`, [id]);
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  getProductsByCategorySlug,
  addProductImage,
  getProductImages,
  deleteProductImage,
  createProduct,
  updateProduct,
  deleteProduct
};
