import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from '../../common/FloatingButtons';

const CustomerLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1">
        {React.cloneElement(children, { darkMode })}
      </main>
      
      <Footer darkMode={darkMode} />
      
      <FloatingButtons darkMode={darkMode} />
    </div>
  );
};

export default CustomerLayout;