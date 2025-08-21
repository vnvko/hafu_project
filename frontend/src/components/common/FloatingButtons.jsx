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
      {/* Contact Button - Fixed to RIGHT edge */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {/* Contact Options - Show on LEFT side of button */}
        <div className={`mb-3 space-y-2 transition-all duration-300 ${
          isContactOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
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
              <div className={`mr-3 px-3 py-2 rounded-lg text-white text-sm whitespace-nowrap shadow-lg transition-all backdrop-blur-sm max-w-[200px] ${
                darkMode ? 'bg-gray-800/95 border border-gray-600' : 'bg-white/95 text-gray-800 border border-gray-200'
              }`}>
                <div className="font-medium">{contact.name}</div>
                <div className="text-xs opacity-80">{contact.value}</div>
              </div>
              {/* Contact Button - RIGHT side */}
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full ${contact.color} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 flex-shrink-0`}
                title={contact.name}
              >
                <i className={`${contact.icon} text-base`}></i>
              </a>
            </div>
          ))}
        </div>

        {/* Main Contact Button - Fixed to right edge */}
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isContactOpen
              ? 'bg-red-500 hover:bg-red-600 rotate-45'
              : darkMode
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
          } text-white`}
          title={isContactOpen ? 'Đóng' : 'Liên hệ'}
        >
          <i className={`fas ${isContactOpen ? 'fa-times' : 'fa-comments'} text-xl`}></i>
        </button>
      </div>

      {/* Back to Top Button - Above contact button, WORKING */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-[1002] ${
            darkMode
              ? 'bg-gray-800/90 hover:bg-gray-700 text-white border border-gray-600'
              : 'bg-white/90 hover:bg-gray-50 text-gray-700 border border-gray-200'
          } backdrop-blur-sm`}
          title="Lên đầu trang"
          style={{ pointerEvents: 'auto' }} // Đảm bảo button nhận sự kiện
        >
          <i className="fas fa-chevron-up text-base"></i>
        </button>
      )}

      {/* Contact Overlay - Click outside to close */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsContactOpen(false)}
        ></div>
      )}
    </>
  );
};

export default FloatingButtons;