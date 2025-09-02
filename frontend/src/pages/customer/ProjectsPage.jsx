import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectsPage = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 9; // 3 rows x 3 projects

  // Mock project data
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        title: "Hashtag Campaign Thời Trang Xuân 2024",
        description: "Chiến dịch hashtag cho thương hiệu thời trang với 2M+ lượt tương tác",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
        category: "Fashion",
        client: "Thương hiệu A",
        year: "2024",
        tags: ["#fashion", "#spring2024", "#viral"],
        results: {
          reach: "2.5M",
          engagement: "340K",
          hashtags: "150+"
        },
        featured: true
      },
      {
        id: 2,
        title: "F&B Restaurant Marketing Strategy",
        description: "Bộ hashtag cho chuỗi nhà hàng, tăng 300% traffic social media",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        category: "Food & Beverage",
        client: "Restaurant Chain B",
        year: "2024",
        tags: ["#restaurant", "#food", "#delicious"],
        results: {
          reach: "1.8M",
          engagement: "280K",
          hashtags: "200+"
        },
        featured: true
      },
      {
        id: 3,
        title: "Beauty Brand Hashtag Package",
        description: "Hashtag strategy cho thương hiệu mỹ phẩm, viral trên TikTok & Instagram",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
        category: "Beauty",
        client: "Cosmetics Brand C",
        year: "2024",
        tags: ["#beauty", "#skincare", "#makeup"],
        results: {
          reach: "3.2M",
          engagement: "450K",
          hashtags: "300+"
        },
        featured: true
      },
      {
        id: 4,
        title: "Travel Tourism Hashtag Collection",
        description: "Bộ hashtag du lịch cho tour operator, tăng booking 250%",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
        category: "Travel",
        client: "Travel Agency D",
        year: "2023",
        tags: ["#travel", "#vietnam", "#adventure"],
        results: {
          reach: "1.5M",
          engagement: "200K",
          hashtags: "180+"
        },
        featured: false
      },
      {
        id: 5,
        title: "Tech Startup Hashtag Strategy",
        description: "Hashtag campaign cho startup fintech, viral trong cộng đồng tech",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        category: "Technology",
        client: "Fintech Startup E",
        year: "2023",
        tags: ["#fintech", "#startup", "#innovation"],
        results: {
          reach: "800K",
          engagement: "120K",
          hashtags: "100+"
        },
        featured: false
      },
      {
        id: 6,
        title: "Real Estate Marketing Package",
        description: "Hashtag cho dự án bất động sản, tăng leads 400%",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        category: "Real Estate",
        client: "Property Developer F",
        year: "2023",
        tags: ["#realestate", "#luxury", "#investment"],
        results: {
          reach: "1.2M",
          engagement: "180K",
          hashtags: "120+"
        },
        featured: false
      },
      // Add more projects
      ...Array.from({ length: 6 }, (_, i) => ({
        id: 7 + i,
        title: `Project ${7 + i} - Hashtag Strategy`,
        description: `Mô tả ngắn gọn về dự án hashtag số ${7 + i}...`,
        image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`,
        category: ["Fashion", "Technology", "Food & Beverage", "Beauty"][i % 4],
        client: `Client ${String.fromCharCode(65 + i)}`,
        year: "2023",
        tags: ["#hashtag", "#marketing", "#strategy"],
        results: {
          reach: `${500 + (i * 100)}K`,
          engagement: `${50 + (i * 20)}K`,
          hashtags: `${80 + (i * 10)}+`
        },
        featured: false
      }))
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...projects];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => 
        project.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === selectedCategory
      );
    }

    // Sort featured first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return parseInt(b.year) - parseInt(a.year);
    });

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [projects, selectedCategory]);

  const categories = [
    { value: 'all', label: 'Tất cả', count: projects.length },
    { value: 'fashion', label: 'Thời trang', count: projects.filter(p => p.category === 'Fashion').length },
    { value: 'food-beverage', label: 'F&B', count: projects.filter(p => p.category === 'Food & Beverage').length },
    { value: 'beauty', label: 'Làm đẹp', count: projects.filter(p => p.category === 'Beauty').length },
    { value: 'technology', label: 'Công nghệ', count: projects.filter(p => p.category === 'Technology').length },
    { value: 'travel', label: 'Du lịch', count: projects.filter(p => p.category === 'Travel').length },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className={`rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
      darkMode 
        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
        : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-md hover:shadow-xl'
    }`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {project.featured && (
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
              <i className="fas fa-star mr-1"></i>
              Featured
            </span>
          )}
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {project.year}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors">
            <i className="fas fa-eye mr-2"></i>
            Xem chi tiết
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Category & Client */}
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            darkMode 
              ? 'bg-pink-500/20 text-pink-300' 
              : 'bg-pink-100 text-pink-600'
          }`}>
            {project.category}
          </span>
          <span className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {project.client}
          </span>
        </div>
        
        {/* Title */}
        <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        
        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 mb-3 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={`text-xs px-2 py-1 rounded-full ${
              darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tag}
            </span>
          ))}
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm font-bold text-pink-600">{project.results.reach}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reach</div>
          </div>
          <div>
            <div className="text-sm font-bold text-blue-600">{project.results.engagement}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Engagement</div>
          </div>
          <div>
            <div className="text-sm font-bold text-green-600">{project.results.hashtags}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hashtags</div>
          </div>
        </div>
      </div>
    </div>
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
              Dự án
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-briefcase mr-3 text-pink-500"></i>
            Dự Án Đã Thực Hiện
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Khám phá các dự án hashtag thành công mà chúng tôi đã thực hiện cho khách hàng
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
          }`}>
            <div className="text-2xl font-bold text-pink-600 mb-1">50+</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dự án</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
          }`}>
            <div className="text-2xl font-bold text-blue-600 mb-1">30+</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Khách hàng</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
          }`}>
            <div className="text-2xl font-bold text-green-600 mb-1">10M+</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lượt tiếp cận</div>
          </div>
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
          }`}>
            <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hài lòng</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Hiển thị {filteredProjects.length} dự án
          </p>
          {totalPages > 1 && (
            <div className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {currentProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <i className="fas fa-briefcase text-3xl text-gray-400"></i>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Không tìm thấy dự án
                </h3>
                <p className="text-gray-500 mb-4">
                  Thử chọn danh mục khác
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="btn-primary px-6 py-3"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Xem tất cả dự án
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

        {/* Call to Action */}
        <div className={`mt-12 text-center p-8 rounded-2xl ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-rocket mr-2 text-pink-500"></i>
            Bạn có dự án hashtag?
          </h3>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Hãy để chúng tôi giúp bạn tạo ra chiến dịch hashtag thành công tiếp theo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center"
            >
              <i className="fas fa-comments mr-2"></i>
              Tư vấn miễn phí
            </Link>
            <a
              href="tel:0123456789"
              className={`px-8 py-4 text-lg rounded-xl font-medium transition-all hover:scale-105 border inline-flex items-center justify-center ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              <i className="fas fa-phone mr-2"></i>
              0123.456.789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;