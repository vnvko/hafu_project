import React, { useState, useEffect } from 'react';

const FloatingButtons = ({ darkMode }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const contacts = [
    {
      name: 'Điện thoại',
      icon: 'fas fa-phone',
      value: '0123.456.789',
      href: 'tel:0123456789',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Zalo',
      icon: 'fas fa-comment-dots',
      value: 'Chat Zalo',
      href: 'https://zalo.me/0123456789',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-messenger',
      value: 'Messenger',
      href: 'https://m.me/hashtagshop',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      value: 'info@hashtagshop.com',
      href: 'mailto:info@hashtagshop.com',
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <>
      {/* Contact Button - Right edge, contact options on left */}
      <div className="fixed bottom-4 right-1 z-50">
        {/* Contact Options - Show on LEFT side */}
        <div className={`mb-3 space-y-2 transition-all duration-300 ${
          isContactOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {contacts.map((contact, index) => (
            <div
              key={contact.name}
              className="flex items-center justify-end"
              style={{ 
                transitionDelay: isContactOpen ? `${index * 50}ms` : '0ms' 
              }}
            >
              {/* Contact Label - LEFT side */}
              <div className={`mr-2 px-2 py-1 rounded text-white text-xs whitespace-nowrap shadow-lg transition-all backdrop-blur-sm ${
                darkMode ? 'bg-gray-800/90 border border-gray-600' : 'bg-white/90 text-gray-800 border border-gray-200'
              }`}>
                {contact.value}
              </div>
              {/* Contact Button - RIGHT side */}
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full ${contact.color} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200`}
                title={contact.name}
              >
                <i className={`${contact.icon} text-sm`}></i>
              </a>
            </div>
          ))}
        </div>

        {/* Main Contact Button - At right edge */}
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isContactOpen
              ? 'bg-red-500 hover:bg-red-600 rotate-45'
              : darkMode
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
          } text-white`}
          title={isContactOpen ? 'Đóng' : 'Liên hệ'}
        >
          <i className={`fas ${isContactOpen ? 'fa-times' : 'fa-comments'} text-lg`}></i>
        </button>
      </div>

      {/* Back to Top Button - Above contact button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-20 right-1 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${
            darkMode
              ? 'bg-gray-800/90 hover:bg-gray-700 text-white border border-gray-600'
              : 'bg-white/90 hover:bg-gray-50 text-gray-700 border border-gray-200'
          } backdrop-blur-sm`}
          title="Lên đầu trang"
        >
          <i className="fas fa-chevron-up text-sm"></i>
        </button>
      )}
    </>
  );
};

export default FloatingButtons;