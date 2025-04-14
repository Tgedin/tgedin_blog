import "../styles/globals.css";
import { useEffect, useState } from "react";
import PasswordProtection from "../components/PasswordProtection";

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for public mode
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(false); // Add this flag

  // Check if protection is enabled and if user is already authenticated
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if protection mode is enabled
    const protectionEnabled =
      localStorage.getItem("protection_enabled") === "true";
    setIsProtectionEnabled(protectionEnabled);

    if (protectionEnabled) {
      // Check localStorage for authentication
      const isAuth = localStorage.getItem("auth_verified") === "true";
      setIsAuthenticated(isAuth);
    } else {
      // If protection is disabled, always authenticate
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);

    // Initialize theme on client side
    const savedTheme = localStorage.getItem("theme");

    // Apply theme from localStorage or default to dark mode
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to dark mode
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    // Add keyboard shortcut to toggle protection mode (Ctrl+Shift+P)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        const newProtectionState = !protectionEnabled;
        localStorage.setItem(
          "protection_enabled",
          newProtectionState.toString()
        );

        if (newProtectionState) {
          // If enabling protection, clear auth
          localStorage.removeItem("auth_verified");
          alert("Password protection enabled. You will need to authenticate.");
          window.location.reload();
        } else {
          // If disabling protection, notify user
          alert("Password protection disabled. Site is now public.");
          window.location.reload();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle successful authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return <div className="loading-screen">Loading...</div>;
  }

  // Show password protection if enabled and not authenticated
  if (isProtectionEnabled && !isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthentication} />;
  }

  // If authenticated or protection disabled, render the actual app
  return <Component {...pageProps} />;
}

export default MyApp;
