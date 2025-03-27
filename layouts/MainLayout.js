import Head from 'next/head';
import Header from '../components/Header';

export default function MainLayout({ children, title, description }) {
  const siteTitle = title ? `${title} | Theo Gedin` : 'Theo Gedin | From Bricks to Bytes';
  const metaDescription = description || 'Personal blog and project showcase by Theo Gedin';
  
  return (
    <div className="layout">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        
        {/* SEO metadata for name searchability */}
        <meta name="author" content="Theo Gedin" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Theo Gedin" />
        
        {/* Name variations for improved search */}
        <meta name="keywords" content="Theo Gedin, From Bricks to Bytes, data science, civil engineering" />
        
        {/* Structured data for better search results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Theo Gedin",
              "url": "https://tgedin.dev",
              "jobTitle": "Data Scientist",
              "knowsAbout": ["Data Science", "Civil Engineering", "Urban Planning", "Machine Learning"]
            }
          `}
        </script>
      </Head>
      
      <Header />
      
      <main id="main-content" className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com/Tgedin/tgedin_blog" className="footer-link" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
