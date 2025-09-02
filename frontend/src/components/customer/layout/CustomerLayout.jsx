import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from '../../common/FloatingButtons';

const CustomerLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const location = useLocation();

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      console.log('🔄 Loading saved dark mode:', isDark);
      setDarkMode(isDark);
    }
  }, []);

  // FIXED: Apply dark mode with multiple methods + debug logs
  useEffect(() => {
    console.log('🎨 Dark mode effect triggered:', darkMode);
    
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Get DOM elements
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (darkMode) {
      console.log('🌙 Applying DARK mode...');
      
      // Method 1: Add dark class
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
      
      // Method 2: Set CSS custom properties
      htmlElement.style.setProperty('--bg-color', '#0f1419');
      htmlElement.style.setProperty('--text-color', '#e5e7eb');
      
      // Method 3: Direct inline styles (force override)
      bodyElement.style.background = 'linear-gradient(135deg, #0f1419 0%, #1a1625 50%, #1e1b2e 100%)';
      bodyElement.style.color = '#e5e7eb';
      bodyElement.style.minHeight = '100vh';
      
      console.log('✅ Dark mode styles applied');
      console.log('HTML classes:', htmlElement.className);
      console.log('Body background:', bodyElement.style.background);
      
    } else {
      console.log('☀️ Applying LIGHT mode...');
      
      // Method 1: Remove dark class
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
      
      // Method 2: Set CSS custom properties
      htmlElement.style.setProperty('--bg-color', '#fdf2f8');
      htmlElement.style.setProperty('--text-color', '#374151');
      
      // Method 3: Direct inline styles (force override)
      bodyElement.style.background = 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)';
      bodyElement.style.color = '#374151';
      bodyElement.style.minHeight = '100vh';
      
      console.log('✅ Light mode styles applied');
      console.log('HTML classes:', htmlElement.className);
      console.log('Body background:', bodyElement.style.background);
    }
    
    // Force re-paint
    bodyElement.style.display = 'none';
    bodyElement.offsetHeight; // Trigger reflow
    bodyElement.style.display = '';
    
    console.log('🔄 Force repaint completed');
    
  }, [darkMode]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleDarkMode = () => {
    console.log('🎯 Dark mode toggle clicked!');
    console.log('Current state:', darkMode);
    console.log('Will become:', !darkMode);
    
    setDarkMode(!darkMode);
    setForceUpdate(prev => prev + 1); // Force re-render
  };

  // Debug current state
  useEffect(() => {
    console.log('📊 CustomerLayout state:');
    console.log('- darkMode:', darkMode);
    console.log('- forceUpdate:', forceUpdate);
    console.log('- pathname:', location.pathname);
  }, [darkMode, forceUpdate, location.pathname]);

  return (
    <div 
      key={forceUpdate} // Force re-render on dark mode changes
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        darkMode 
          ? 'dark bg-gray-900 text-white' 
          : 'bg-pink-50 text-gray-900'
      }`} 
      style={{
        // Force inline styles as fallback
        background: darkMode 
          ? 'linear-gradient(135deg, #0f1419 0%, #1a1625 50%, #1e1b2e 100%)' 
          : 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
        minHeight: '100vh',
        color: darkMode ? '#e5e7eb' : '#374151',
        transition: 'all 0.5s ease'
      }}
      data-theme={darkMode ? 'dark' : 'light'}
      data-force-update={forceUpdate}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main 
        className={`flex-1 transition-all duration-500 ${
          darkMode 
            ? 'bg-transparent text-white' 
            : 'bg-transparent text-gray-900'
        }`}
        style={{
          background: 'transparent',
          color: darkMode ? '#e5e7eb' : '#374151'
        }}
      >
        {React.cloneElement(children, { darkMode })}
      </main>
      
      <Footer darkMode={darkMode} />
      
      <FloatingButtons darkMode={darkMode} />
    </div>
  );
};

export default CustomerLayout;