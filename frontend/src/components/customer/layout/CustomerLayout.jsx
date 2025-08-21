import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from '../../common/FloatingButtons';

const CustomerLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
    
    // Apply dark mode to body
    if (darkMode) {
      document.body.style.background = 'linear-gradient(135deg, #0f1419 0%, #1a1625 50%, #1e1b2e 100%)';
      document.body.style.color = '#e5e7eb';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)';
      document.body.style.color = '#374151';
    }
  }, [darkMode]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      darkMode 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className={`flex-1 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : ''
      }`}>
        {React.cloneElement(children, { darkMode })}
      </main>
      
      <Footer darkMode={darkMode} />
      
      <FloatingButtons darkMode={darkMode} />
    </div>
  );
};

export default CustomerLayout;