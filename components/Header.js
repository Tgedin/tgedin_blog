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

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Function to get the proper theme icon
  const getThemeIcon = () => {
    if (theme === "light") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
          width="18"
          height="18"
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

    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("menu-open");
      }
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`header sticky-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <Link
          href="/"
          className={`site-title ${isActive("/") ? "active" : ""}`}
        >
          <span className="main-title">Théo Gédin</span>
          <span className="subtitle">Bricks to Bytes</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-links">
            {/* Remove Blog link */}
            {/* <Link href="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link> */}
            <Link
              href="/projects"
              className={isActive("/projects") ? "active" : ""}
            >
              Projects
            </Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""}>
              About
            </Link>
            <a
              href="https://theogedin.substack.com/"
              className="nav-external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Substack
            </a>
            <Link
              href="/contact"
              className={`contact-button ${
                isActive("/contact") ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>

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
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="mobile-controls">
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

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <nav>
          {/* Remove Blog link */}
          {/* <Link href="/blog" ...>Blog</Link> */}
          <Link
            href="/projects"
            className={isActive("/projects") ? "active" : ""}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <a
            href="https://theogedin.substack.com/"
            className="nav-external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Substack
          </a>
          <Link
            href="/contact"
            className={`contact-button ${isActive("/contact") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            href="https://www.linkedin.com/in/th%C3%A9o-gedin-4a4365226/"
            className="nav-external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 100;
          background: rgba(var(--color-bg-rgb), 0.93);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
          transition: all var(--transition-medium) ease;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header.scrolled {
          box-shadow: var(--shadow-md);
          background: rgba(var(--color-bg-rgb), 0.97);
        }

        .site-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          transition: color var(--transition-fast) ease;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .main-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1.1;
        }

        .subtitle {
          font-size: 0.92rem;
          color: var(--color-secondary);
          font-weight: 400;
          margin-top: 0.1rem;
          letter-spacing: 0.01em;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .nav-links a {
          color: var(--color-text);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.97rem;
          padding: 0.4rem 0;
          position: relative;
          transition: color var(--transition-medium) ease;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-primary);
          transition: width var(--transition-medium) ease;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--color-primary);
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        /* External link styling */
        .nav-external-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-external-link::after {
          content: "↗";
          font-size: 0.8rem;
          transition: transform var(--transition-fast) ease;
          display: inline-block;
          opacity: 0.8;
          margin-left: 2px;
        }

        .nav-external-link:hover::after {
          transform: translate(2px, -2px);
        }

        /* Contact button styling */
        .contact-button {
          background-color: var(--color-primary);
          color: white !important;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all var(--transition-medium) ease;
          text-align: center;
          font-size: 0.97rem;
        }

        .contact-button:hover,
        .contact-button.active {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
          text-decoration: none;
        }

        .contact-button::after {
          display: none;
        }

        /* Theme Toggle */
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 1.1rem;
          padding: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          border-radius: 50%;
          transition: background-color var(--transition-fast) ease;
        }

        .theme-toggle:hover {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          color: var(--color-primary);
        }

        /* Mobile Elements */
        .mobile-controls {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10;
        }

        .mobile-menu-toggle .bar {
          width: 100%;
          height: 2px;
          background-color: var(--color-text);
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .mobile-menu-toggle.open .bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-toggle.open .bar:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.open .bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: var(--color-card-bg);
          padding: 0.7rem 0;
          box-shadow: var(--shadow-lg);
          transform: translateY(-10px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 99;
          border-bottom: 1px solid var(--color-border);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu nav {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.1rem;
        }

        .mobile-menu a {
          text-decoration: none;
          color: var(--color-text);
          font-weight: 500;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--color-border);
          transition: color var(--transition-medium) ease;
          font-size: 1.05rem;
        }

        .mobile-menu a:last-child {
          border-bottom: none;
        }

        .mobile-menu a:hover,
        .mobile-menu a.active {
          color: var(--color-primary);
        }

        .mobile-menu .contact-button {
          margin-top: 0.5rem;
        }

        /* Media Queries */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-controls {
            display: flex;
          }

          .mobile-menu {
            display: block;
          }

          .header-container {
            padding: 0.5rem 0.7rem;
          }
        }
      `}</style>
    </header>
  );
}
