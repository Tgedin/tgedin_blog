import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState('light'); // Default to light instead of system
  
  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };
  
  // Initialize theme from localStorage or default to light
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get saved theme or default to light
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // If user has a saved preference, use it
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        // Default to light theme if no preference is saved
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, []);
  
  // Toggle theme function - simplified to only switch between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Update state
    setTheme(newTheme);
    
    // Update DOM
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    console.log('Theme toggled to:', newTheme);
  };
  
  // Function to get the proper theme icon - simplified
  const getThemeIcon = () => {
    return theme === 'light' ? '🌙' : '☀️'; // Moon for light (toggle to dark), Sun for dark (toggle to light)
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
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </nav>
    </header>
  );
}
