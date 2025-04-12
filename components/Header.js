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
    return theme === "light" ? "🌙" : "☀️";
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
        }

        header.scrolled {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background-color: var(--color-bg);
        }

        .theme-icon {
          display: inline-block;
          transition: transform 0.5s ease;
        }

        .theme-toggle:hover .theme-icon {
          transform: rotate(360deg);
        }
      `}</style>
    </header>
  );
}
