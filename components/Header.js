import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
  };

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get saved theme or default to dark
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }

      // Add scroll event listener for header styling
      const handleScroll = () => {
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Toggle theme function with improved animation
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Update state
    setTheme(newTheme);

    // Update DOM
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save preference
    localStorage.setItem("theme", newTheme);
  };

  // Function to get the proper theme icon with improved visuals
  const getThemeIcon = () => {
    // Replace emojis with minimalist SVG icons
    if (theme === "light") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
    }
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <Link
          href="/"
          className={`site-title ${isActive("/") ? "active" : ""}`}
        >
          From Bricks to Bytes
        </Link>
        <div className="nav-links">
          <Link href="/blog" className={isActive("/blog") ? "active" : ""}>
            Blog
          </Link>
          <Link
            href="/projects"
            className={isActive("/projects") ? "active" : ""}
          >
            Projects
          </Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className="theme-icon">{getThemeIcon()}</span>
          </button>
        </div>
      </nav>

      <style jsx>{`
        header {
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
          background-color: var(--color-bg);
          backdrop-filter: blur(10px);
        }

        header.scrolled {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background-color: rgba(var(--color-bg-rgb), 0.95);
        }

        /* Ensure the blur effect works correctly with the new color scheme */
        [data-theme="dark"] header {
          background-color: rgba(
            30,
            32,
            48,
            0.9
          ); /* Match the new dark mode color */
        }

        [data-theme="dark"] header.scrolled {
          background-color: rgba(30, 32, 48, 0.98);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          padding: 0.4rem;
          position: relative;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          width: 32px;
          height: 32px;
          opacity: 0.7;
        }

        .theme-toggle:hover {
          color: var(--color-primary);
          background-color: rgba(var(--color-primary-rgb), 0.05);
          opacity: 1;
        }

        .theme-toggle:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .theme-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        /* Remove rotation animation for more minimalist feel */
        .theme-toggle:hover .theme-icon {
          transform: none;
        }

        /* Hide the tooltip text for cleaner look */
        .theme-toggle::after {
          display: none;
        }
      `}</style>
    </header>
  );
}
