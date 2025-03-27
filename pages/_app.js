import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Initialize theme on client side
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Apply theme from localStorage or default to light mode
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to light mode instead of using system preference
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
