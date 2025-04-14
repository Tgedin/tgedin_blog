import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // Initialize theme on client side
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");

    // Apply theme from localStorage or default to dark mode
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to dark mode
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
