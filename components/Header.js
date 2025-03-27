import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  
  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };
  
  // Function to apply theme based on system preference
  const applySystemTheme = () => {
    const prefersDark = window.matchMedia && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  };
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get saved theme
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // If user has a saved preference, use it
        setTheme(savedTheme);
        if (savedTheme === 'system') {
          applySystemTheme();
        } else {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } else {
        // Default to system theme if no preference is saved
        setTheme('system');
        applySystemTheme();
      }
      
      // Add listener for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Function to handle system preference changes
      const handleSystemThemeChange = (e) => {
        if (theme === 'system') {
          document.documentElement.setAttribute(
            'data-theme', 
            e.matches ? 'dark' : 'light'
          );
        }
      };
      
      // Add event listener
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      // Clean up
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme]);
  
  // Toggle theme function - now cycles through light, dark, system
  const toggleTheme = () => {
    const themeMap = {
      'light': 'dark',
      'dark': 'system',
      'system': 'light'
    };
    
    const newTheme = themeMap[theme];
    
    // Update state
    setTheme(newTheme);
    
    // Update DOM
    if (newTheme === 'system') {
      applySystemTheme();
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    console.log('Theme toggled to:', newTheme);
  };
  
  // Function to get the proper theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '🖥️';
      default: return '☀️';
    }
  };
  
  return (
    <header>
      <nav>
        <Link href="/" className={`site-title ${isActive('/') ? 'active' : ''}`}>
          From Bricks to Bytes
        </Link>
        <div className="nav-links">
          <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>
            Blog
          </Link>
          <Link href="/projects" className={isActive('/projects') ? 'active' : ''}>
            Projects
          </Link>
          <Link href="/about" className={isActive('/about') ? 'active' : ''}>
            About
          </Link>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch theme, current theme is ${theme}`}
            title={`Theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </nav>
    </header>
  );
}
