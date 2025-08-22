import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto hide status message
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const contactMethods = [
    {
      icon: 'fas fa-phone',
      title: 'Điện thoại',
      value: '0123.456.789',
      href: 'tel:0123456789',
      color: 'text-green-600',
      bgColor: darkMode ? 'bg-green-500/20' : 'bg-green-50',
      description: 'Gọi trực tiếp để tư vấn nhanh'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: '0123.456.789',
      href: 'https://wa.me/84123456789',
      color: 'text-green-600',
      bgColor: darkMode ? 'bg-green-500/20' : 'bg-green-50',
      description: 'Chat qua WhatsApp'
    },
    {
      icon: 'fas fa-comment-dots',
      title: 'Zalo',
      value: 'Chat Zalo',
      href: 'https://zalo.me/0123456789',
      color: 'text-blue-600',
      bgColor: darkMode ? 'bg-blue-500/20' : 'bg-blue-50',
      description: 'Nhắn tin qua Zalo'
    },
    {
      icon: 'fab fa-facebook-messenger',
      title: 'Messenger',
      value: 'HaFu House',
      href: 'https://m.me/hafuhouse',
      color: 'text-blue-600',
      bgColor: darkMode ? 'bg-blue-500/20' : 'bg-blue-50',
      description: 'Chat qua Facebook Messenger'
    },
    {
      icon: 'fab fa-telegram',
      title: 'Telegram',
      value: '@hafuhouse',
      href: 'https://t.me/hafuhouse',
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-500/20' : 'bg-blue-50',
      description: 'Liên hệ qua Telegram'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'info@hafuhouse.com',
      href: 'mailto:info@hafuhouse.com',
      color: 'text-red-600',
      bgColor: darkMode ? 'bg-red-500/20' : 'bg-red-50',
      description: 'Gửi email chi tiết'
    }
  ];

  const services = [
    'Hashtag Marketing Strategy',
    'Social Media Content Creation',
    'Influencer Marketing',
    'Brand Hashtag Development',
    'Trending Hashtag Research',
    'Campaign Management',
    'Khác'
  ];

  const budgetRanges = [
    'Dưới 5 triệu',
    '5 - 10 triệu',
    '10 - 20 triệu',
    '20 - 50 triệu',
    'Trên 50 triệu',
    'Thỏa thuận'
  ];

  const faqs = [
    {
      question: "Thời gian hoàn thành dự án hashtag là bao lâu?",
      answer: "Thông thường từ 3-7 ngày tùy thuộc vào quy mô dự án. Hashtag package nhỏ có thể hoàn thành trong 1-2 ngày."
    },
    {
      question: "Chi phí dịch vụ hashtag được tính như thế nào?",
      answer: "Chi phí phụ thuộc vào số lượng hashtag, độ phức tạp nghiên cứu và thời gian giao. Chúng tôi có gói từ 500K đến 50M+."
    },
    {
      question: "Có bảo hành hay hỗ trợ sau khi giao dự án không?",
      answer: "Có, chúng tôi hỗ trợ 30 ngày sau giao dự án và update hashtag trending miễn phí trong 3 tháng."
    },
    {
      question: "Hashtag có phù hợp với ngành nghề của tôi không?",
      answer: "Chúng tôi có kinh nghiệm với hầu hết các ngành: thời trang, F&B, beauty, tech, bất động sản, du lịch..."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

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
              Liên hệ
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
            <i className="fas fa-comments mr-3 text-pink-500"></i>
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sẵn sàng tư vấn miễn phí và hỗ trợ 24/7 cho dự án hashtag của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h2 className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <i className="fas fa-phone-alt mr-2 text-pink-500"></i>
              Kênh liên hệ
            </h2>
            
            <div className="space-y-3 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl transition-all hover:scale-105 ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.bgColor} mr-4`}>
                    <i className={`${method.icon} text-lg ${method.color}`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {method.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {method.description}
                    </p>
                    <p className={`text-sm font-medium ${method.color}`}>
                      {method.value}
                    </p>
                  </div>
                  <i className="fas fa-external-link-alt text-gray-400"></i>
                </a>
              ))}
            </div>

            {/* Company Info */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
            }`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <i className="fas fa-building mr-2 text-pink-500"></i>
                Thông tin công ty
              </h3>
              <div className="space-y-3">
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <i className="fas fa-map-marker-alt text-pink-500 mr-2 w-4"></i>
                  123 Đường ABC, Quận XYZ, TP.HCM
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <i className="fas fa-clock text-pink-500 mr-2 w-4"></i>
                  T2-T6: 8:00-18:00, T7: 8:00-12:00
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <i className="fas fa-globe text-pink-500 mr-2 w-4"></i>
                  www.hafuhouse.com
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
            }`}>
              <h2 className={`text-lg font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-paper-plane mr-2 text-pink-500"></i>
                Gửi yêu cầu tư vấn
              </h2>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <i className="fas fa-check-circle mr-2"></i>
                  Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong 30 phút.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                      placeholder="0123.456.789"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Dịch vụ quan tâm
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                    >
                      <option value="">Chọn dịch vụ</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Ngân sách dự kiến
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border text-sm ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                  >
                    <option value="">Chọn mức ngân sách</option>
                    {budgetRanges.map((budget) => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Mô tả chi tiết dự án *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border text-sm resize-none ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100`}
                    placeholder="Mô tả ngành nghề, mục tiêu, yêu cầu cụ thể..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Gửi yêu cầu tư vấn
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className={`text-xl font-bold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-question-circle mr-2 text-pink-500"></i>
            Câu Hỏi Thường Gặp
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`rounded-xl border overflow-hidden ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full text-left p-4 hover:bg-opacity-50 transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <i className={`fas fa-chevron-${activeFaq === index ? 'up' : 'down'} text-pink-500 transition-transform`}></i>
                  </div>
                </button>
                {activeFaq === index && (
                  <div className={`px-4 pb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className={`text-xl font-bold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-map-marker-alt mr-2 text-pink-500"></i>
            Vị Trí Công Ty
          </h2>
          
          <div className={`rounded-xl overflow-hidden ${
            darkMode ? 'border border-gray-700' : 'border border-gray-200 shadow-lg'
          }`}>
            <div className="h-64 bg-gray-200 relative">
              {/* Mock Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="text-center">
                  <i className="fas fa-map-marked-alt text-4xl text-gray-600 mb-2"></i>
                  <p className="text-gray-600 font-medium">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">123 Đường ABC, Quận XYZ, TP.HCM</p>
                </div>
              </div>
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <i className="fas fa-map-pin text-2xl text-red-500 animate-bounce"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;