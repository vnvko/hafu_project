import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const BlogPage = ({ darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const postsPerPage = 12; // 3 rows x 4 posts = 12 per page mobile

  // Lấy dữ liệu động từ API
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await api.getBlogPosts();
        // Chuẩn hoá dữ liệu để khớp UI cũ
        const normalized = (data || []).map((p) => ({
          id: p.id,
          title: p.title,
          excerpt: (p.content || '').replace(/<[^>]*>?/gm, '').slice(0, 140) + '...',
          content: p.content,
          image: p.cover_url,
          date: p.published_at || p.created_at,
          readTime: '5 phút đọc',
          author: 'HaFu Team',
          category: 'Tin tức',
          tags: ['#hashtag'],
          views: 0,
          likes: 0
        }));
        if (mounted) {
          setPosts(normalized);
          setFilteredPosts(normalized);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...posts];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, selectedCategory, searchQuery]);

  const categories = [
    { value: 'all', label: 'Tất cả', count: posts.length },
    { value: 'trending', label: 'Trending', count: posts.filter(p => p.category === 'Trending').length },
    { value: 'tips', label: 'Tips', count: posts.filter(p => p.category === 'Tips').length },
    { value: 'strategy', label: 'Strategy', count: posts.filter(p => p.category === 'Strategy').length },
    { value: 'tools', label: 'Tools', count: posts.filter(p => p.category === 'Tools').length },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={`rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
          <div className="p-3 space-y-2">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const BlogCard = ({ post }) => (
    <Link to={`/blog/${post.id}`} className="group">
      <article className={`rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-md hover:shadow-lg'
      }`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-28 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 flex space-x-1">
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              darkMode 
                ? 'bg-gray-800/80 text-white' 
                : 'bg-white/90 text-gray-800'
            }`}>
              <i className="fas fa-clock mr-1"></i>
              {post.readTime}
            </span>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className={`w-6 h-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/90 text-gray-700'
            } hover:text-pink-600 transition-colors`}>
              <i className="fas fa-heart text-xs"></i>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          {/* Meta Info */}
          <div className={`flex items-center justify-between text-xs mb-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>
              <i className="fas fa-calendar mr-1"></i>
              {new Date(post.date).toLocaleDateString('vi-VN')}
            </span>
            <span>
              <i className="fas fa-eye mr-1"></i>
              {post.views}
            </span>
          </div>
          
          {/* Title */}
          <h3 className={`text-sm font-bold mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors leading-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className={`text-xs leading-relaxed line-clamp-2 mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className={`text-xs px-1.5 py-0.5 rounded-full ${
                darkMode 
                  ? 'bg-pink-500/20 text-pink-300' 
                  : 'bg-pink-100 text-pink-600'
              }`}>
                {tag}
              </span>
            ))}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <i className="fas fa-user mr-1"></i>
              {post.author}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <i className="fas fa-heart mr-1 text-pink-500"></i>
                {post.likes}
              </span>
              <span className="text-pink-600 font-medium group-hover:underline">
                Đọc thêm
                <i className="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      {/* Breadcrumb */}
      <div className={`py-2 border-b transition-colors ${
        darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm`}>
        <div className="container">
          <nav className="flex items-center space-x-2 text-xs">
            <Link to="/" className={`hover:text-pink-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <i className="fas fa-home mr-1"></i>
              Trang chủ
            </Link>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Blog
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className={`text-xl sm:text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-blog mr-2 text-pink-500"></i>
            Blog & Tin Tức
          </h1>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Cập nhật xu hướng hashtag và tips marketing mới nhất
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mb-6">
          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
              />
              <i className="fas fa-search absolute right-3 top-4 text-gray-400 text-sm"></i>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? darkMode
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                      : 'bg-pink-50 text-pink-600 border border-pink-200'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 border border-gray-700'
                      : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.label}
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Tìm thấy {filteredPosts.length} bài viết
          </p>
          <div className="text-sm text-gray-500">
            Trang {currentPage} / {totalPages}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {currentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <i className="fas fa-blog text-3xl text-gray-400"></i>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-500 mb-4">
                  Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn-primary px-6 py-3"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Đặt lại bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-pink-500 text-white'
                            : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className={`mt-12 p-6 rounded-2xl ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100'
        }`}>
          <div className="text-center">
            <h3 className={`text-lg font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <i className="fas fa-envelope mr-2 text-pink-500"></i>
              Đăng ký nhận bài viết mới
            </h3>
            <p className={`text-sm mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Nhận thông báo khi có bài viết mới về hashtag và marketing
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className={`flex-1 px-4 py-3 rounded-lg text-sm ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-pink-500`}
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;