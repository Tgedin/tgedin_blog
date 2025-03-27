import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Initialize theme on client side
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Apply theme from localStorage or system preference
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
