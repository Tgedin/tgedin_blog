import Head from "next/head";
import Header from "../components/Header";
import AnimatedBackground from "../components/AnimatedBackground";

export default function MainLayout({ children, title, description, image }) {
  const siteTitle = title
    ? `${title} | Théo Gédin`
    : "Théo Gédin | From Bricks to Bytes";
  const metaDescription =
    description ||
    "Personal blog and project showcase by Théo Gédin - From urban planning to data science";
  const metaImage = image || "/og-default-image.png"; // Default OG image
  const siteUrl = "https://tgedin.dev"; // Update with your actual domain

  return (
    <div className="layout">
      {/* Fun animated confetti background */}
      <div className="confetti-bg" aria-hidden="true">
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/banner.png" type="image/png" />
        <style>{`
          /* Make favicon appear circular in supported browsers */
          link[rel="icon"] {
            border-radius: 50%;
            overflow: hidden;
          }
        `}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />

        {/* Basic SEO */}
        <meta name="author" content="Théo Gédin" />
        <meta
          name="keywords"
          content="Théo Gédin, Theo Gedin, From Bricks to Bytes, data science, civil engineering, urban planning, machine learning, Valencia"
        />
        <link
          rel="canonical"
          href={`${siteUrl}${
            typeof window !== "undefined" ? window.location.pathname : ""
          }`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${siteUrl}${
            typeof window !== "undefined" ? window.location.pathname : ""
          }`}
        />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${siteUrl}${metaImage}`} />
        <meta property="og:site_name" content="From Bricks to Bytes" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={`${siteUrl}${
            typeof window !== "undefined" ? window.location.pathname : ""
          }`}
        />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}${metaImage}`} />
        <meta name="twitter:creator" content="@TheoGedin" />

        {/* Structured data for better search results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Théo Gédin",
              "alternateName": "Theo Gedin",
              "url": "${siteUrl}",
              "image": "${siteUrl}${metaImage}",
              "jobTitle": "Data Scientist",
              "knowsAbout": ["Data Science", "Civil Engineering", "Urban Planning", "Machine Learning"],
              "sameAs": [
                "https://github.com/Tgedin",
                "https://x.com/TheoGedin"
              ]
            }
          `}
        </script>

        {/* Add structured data for BlogPosting type when on a blog post page */}
        {title && title.includes("|") && (
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": "${title.split("|")[0].trim()}",
                "description": "${metaDescription}",
                "image": "${siteUrl}${metaImage}",
                "author": {
                  "@type": "Person",
                  "name": "Théo Gédin",
                  "url": "${siteUrl}/about"
                },
                "publisher": {
                  "@type": "Person",
                  "name": "Théo Gédin",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "${siteUrl}/logo.png"
                  }
                },
                "datePublished": "",
                "dateModified": ""
              }
            `}
          </script>
        )}
      </Head>
      <AnimatedBackground />
      <Header />
      <main id="main-content" className="main-content">
        <div className="content-container">{children}</div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a
              href="https://github.com/Tgedin/tgedin_blog"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="footer-icon"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/TheoGedin"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="footer-icon"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              X
            </a>
            <a
              href="https://www.linkedin.com/in/th%C3%A9o-gedin-4a4365226/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="footer-icon"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            <a
              href="/rss.xml"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="footer-icon"
              >
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
              RSS Feed
            </a>
            <a
              href="https://theogedin.substack.com/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="footer-icon"
              >
                <path d="M18 3v4"></path>
                <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                <path d="M6 21v-4"></path>
                <path d="M10 21v-4"></path>
                <path d="M14 21v-4"></path>
                <path d="M6 7V3"></path>
                <path d="M10 7V3"></path>
                <path d="M14 7V3"></path>
              </svg>
              Substack
            </a>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Théo Gédin. All rights reserved.
          </div>
        </div>
      </footer>
      <style jsx global>{`
        .content-container {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
        }

        @media (min-width: 1200px) {
          .content-container {
            padding: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer {
          margin-top: var(--space-xxl);
          border-top: 1px solid var(--color-border);
          padding: var(--space-xl) 0;
        }

        .footer-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
          text-align: center;
          color: var(--color-muted);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        .footer-link {
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          transition: color var(--transition-fast) ease;
          font-weight: 500;
        }

        .footer-link:hover {
          color: var(--color-primary);
          text-decoration: none;
        }

        .footer-icon {
          opacity: 0.8;
        }

        .footer-social {
          display: none; /* Hide old social links to avoid redundancy */
        }

        .footer-social-link {
          color: var(--color-primary);
          transition: color var(--transition-fast) ease;
        }

        .footer-social-link:hover {
          color: var(--color-primary-dark);
        }

        .copyright {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
