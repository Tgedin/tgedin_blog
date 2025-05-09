import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Add body class when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (mobileMenuOpen) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    }

    // Cleanup function
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("menu-open");
      }
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`header sticky-header ${scrolled ? "scrolled" : ""}`}>
      <nav>
        <Link
          href="/"
          className={`site-title ${isActive("/") ? "active" : ""}`}
        >
          From Bricks to Bytes
        </Link>
        <button
          className="theme-toggle always-visible"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="theme-icon">{getThemeIcon()}</span>
        </button>
        <div className="menu-container">
          <button
            className={`mobile-menu-toggle${
              mobileMenuOpen ? " open" : ""
            } ${theme}`}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="hamburger-icon" aria-hidden="true">
              {/* SVG Hamburger Icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hamburger-svg"
              >
                <rect
                  y="7"
                  width="32"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  className="bar top"
                />
                <rect
                  y="14.5"
                  width="32"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  className="bar middle"
                />
                <rect
                  y="22"
                  width="32"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  className="bar bottom"
                />
              </svg>
            </span>
          </button>
          <div className={`nav-links${mobileMenuOpen ? " open" : ""}`}>
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
            <Link
              href="/newsletter"
              className={isActive("/newsletter") ? "active" : ""}
            >
              Newsletter Substack
            </Link>
            <Link
              href="/contact"
              className={`cta-contact ${isActive("/contact") ? "active" : ""}`}
            >
              Contact
            </Link>
          </div>
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

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--color-card-bg);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s, box-shadow 0.2s;
        }

        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.5rem;
        }

        .site-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
        }

        .menu-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: none;
        }

        .nav-links.open {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--color-bg);
          align-items: flex-end;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          border-radius: 0 0 0 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          z-index: 1000; /* Increased z-index to ensure it appears above other content */
          max-height: calc(100vh - 70px); /* Allow scrolling if menu is tall */
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .nav-links.open {
            position: fixed; /* Changed to fixed positioning */
            top: 70px; /* Positioned below header height */
            right: 0;
            width: 80%; /* Limit width on mobile */
            max-width: 300px;
            height: auto;
            bottom: 0; /* Extend to bottom of screen */
            border-radius: 0;
            overflow-y: auto; /* Allow scrolling */
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
            padding-bottom: 80px; /* Add padding at the bottom for better scrolling */
          }
        }

        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          font-size: 2rem;
          margin-left: 1rem;
          cursor: pointer;
          z-index: 200;
        }

        .hamburger-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-toggle .bar {
          transition: transform 0.3s, opacity 0.3s;
        }

        .mobile-menu-toggle.open .bar.top {
          transform: translateY(7.5px) rotate(45deg);
        }

        .mobile-menu-toggle.open .bar.middle {
          opacity: 0;
        }

        .mobile-menu-toggle.open .bar.bottom {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        @media (max-width: 800px) {
          .nav-links.open {
            /* Already handled above, keep for mobile */
          }
        }

        .theme-toggle {
          background: none;
          border: 1.5px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          padding: 0.4rem;
          position: relative;
          border-radius: 50%;
          transition: background-color 0.2s ease, border 0.2s;
          width: 32px;
          height: 32px;
          opacity: 0.7;
        }

        .theme-toggle:hover,
        .theme-toggle:focus {
          border: 1.5px solid var(--color-primary);
          background: rgba(var(--color-primary-rgb), 0.08);
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

        .theme-toggle.always-visible {
          margin-left: 1.5rem;
        }

        .cta-contact {
          background: var(--color-primary);
          color: #fff;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          margin-left: 1rem;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }

        .cta-contact:hover,
        .cta-contact.active {
          background: var(--color-primary-dark);
          color: #fff;
        }

        .mobile-menu-toggle.light .hamburger-svg {
          color: #111;
        }

        .mobile-menu-toggle.dark .hamburger-svg {
          color: #fff;
        }
      `}</style>
    </header>
  );
}
