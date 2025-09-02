const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const category = req.query.category || null;
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  const sort = req.query.sort || 'created_desc';

  try {
    const { products, total } = await Product.getAllProducts(
      page, limit, search, category, minPrice, maxPrice, sort
    );

    const totalPages = Math.ceil(total / limit);
    res.json({
      data: products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lọc sản phẩm', error: err.message });
  }
};

// ✅ Admin: Lấy tất cả products với pagination
const adminGetAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const category = req.query.category || null;
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  const sort = req.query.sort || 'created_desc';

  try {
    const { products, total } = await Product.getAllProducts(
      page, limit, search, category, minPrice, maxPrice, sort
    );

    const totalPages = Math.ceil(total / limit);
    res.json({
      data: products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lọc sản phẩm', error: err.message });
  }
};

const getProductDetail = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.getProductBySlug(slug);
    if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm', error: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const items = await Product.getProductsByCategorySlug(slug);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm theo danh mục', error: err.message });
  }
};

const addProductImage = async (req, res) => {
  const { id } = req.params;
  const { url, alt, sort } = req.body;

  if (!url) return res.status(400).json({ message: 'Thiếu URL ảnh' });

  try {
    const imageId = await Product.addProductImage({ product_id: id, url, alt: alt || '', sort: sort || 0 });
    res.status(201).json({ message: 'Đã thêm ảnh', imageId });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi thêm ảnh sản phẩm', error: err.message });
  }
};

const getProductImages = async (req, res) => {
  const { id } = req.params;
  try {
    const images = await Product.getProductImages(id);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy ảnh sản phẩm', error: err.message });
  }
};

const deleteProductImage = async (req, res) => {
  const { imageId } = req.params;
  try {
    await Product.deleteProductImage(imageId);
    res.json({ message: 'Đã xoá ảnh thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xoá ảnh sản phẩm', error: err.message });
  }
};

// Admin CRUD
const adminCreateProduct = async (req, res) => {
  const { name, slug, price_min, thumbnail_url, description, category_id } = req.body || {};
  if (!name || !slug) return res.status(400).json({ message: 'Thiếu name hoặc slug' });
  try {
    const id = await Product.createProduct({ 
      name, 
      slug, 
      price_min: Number(price_min) || 0, 
      thumbnail_url: thumbnail_url || null,
      description: description || null,
      category_id: category_id || null
    });
    res.status(201).json({ message: 'Tạo sản phẩm thành công', id });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo sản phẩm', error: err.message });
  }
};

const adminUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, slug, price_min, thumbnail_url, description, category_id } = req.body || {};
  try {
    await Product.updateProduct(id, { 
      name, 
      slug, 
      price_min: price_min != null ? Number(price_min) : undefined, 
      thumbnail_url,
      description,
      category_id
    });
    res.json({ message: 'Cập nhật sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật sản phẩm', error: err.message });
  }
};

const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteProduct(id);
    res.json({ message: 'Đã xoá sản phẩm' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xoá sản phẩm', error: err.message });
  }
};

module.exports = {
  getAllProducts,
  adminGetAllProducts,
  getProductDetail,
  getProductsByCategory,
  addProductImage,
  getProductImages,
  deleteProductImage,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct
};
