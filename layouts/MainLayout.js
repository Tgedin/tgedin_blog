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
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
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
        {children}
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
              View on GitHub
            </a>
            <a
              href="https://x.com/TheoGedin"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on X
            </a>
            <a
              href="/rss.xml"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
              RSS Feed
            </a>
          </div>
          <div className="copyright">
            &copy; 2025 Théo Gédin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
