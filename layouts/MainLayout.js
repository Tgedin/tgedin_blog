import Head from 'next/head';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';

export default function MainLayout({ children, title, description }) {ge }) {
  const siteTitle = title ? `${title} | Théo Gédin` : 'Théo Gédin | From Bricks to Bytes';
  const metaDescription = description || 'Personal blog and project showcase by Théo Gédin'; From urban planning to data science';
  const metaImage = image || '/og-default-image.png'; // Default OG image
  return (teUrl = 'https://tgedin.dev'; // Update with your actual domain
    <div className="layout">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* SEO metadata for name searchability */}rk" />
        <meta name="author" content="Théo Gédin" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />eo Gedin, From Bricks to Bytes, data science, civil engineering, urban planning, machine learning, Valencia" />
        <meta property="og:site_name" content="Théo Gédin" />w !== 'undefined' ? window.location.pathname : ''}`} />
        
        {/* Name variations for improved search */}
        <meta name="keywords" content="Théo Gédin, Theo Gedin, From Bricks to Bytes, data science, civil engineering" />
        <meta property="og:url" content={`${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        {/* Structured data for better search results */}
        <script type="application/ld+json">tent={metaDescription} />
          {`a property="og:image" content={`${siteUrl}${metaImage}`} />
            { property="og:site_name" content="From Bricks to Bytes" />
              "@context": "https://schema.org",US" />
              "@type": "Person",
              "name": "Théo Gédin",
              "alternateName": "Theo Gedin",ummary_large_image" />
              "url": "https://tgedin.dev",`${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
              "jobTitle": "Data Scientist",{siteTitle} />
              "knowsAbout": ["Data Science", "Civil Engineering", "Urban Planning", "Machine Learning"]
            } name="twitter:image" content={`${siteUrl}${metaImage}`} />
          `}a name="twitter:creator" content="@TheoGedin" />
        </script>
      </Head>tructured data for better search results */}
        <script type="application/ld+json">
      <AnimatedBackground />
            {
      <Header />context": "https://schema.org",
              "@type": "Person",
      <main id="main-content" className="main-content">
        {children}ernateName": "Theo Gedin",
      </main> "url": "${siteUrl}",
              "image": "${siteUrl}${metaImage}",
      <footer className="footer">cientist",
        <div className="footer-content">ce", "Civil Engineering", "Urban Planning", "Machine Learning"],
          <div className="footer-links">
            <a href="https://github.com/Tgedin/tgedin_blog" className="footer-link" target="_blank" rel="noopener noreferrer">
              View on GitHubom/TheoGedin"
            </a>
            <a href="https://x.com/TheoGedin" className="footer-link" target="_blank" rel="noopener noreferrer">
              Follow on X
            </a>>
            <a href="/rss.xml" className="footer-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>logPosting type when on a blog post page */}
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>t type="application/ld+json">
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
              RSS Feed      "@context": "https://schema.org",
            </a>             "@type": "BlogPosting",
          </div>               "headline": "${title.split('|')[0].trim()}",
          <div className="copyright">                "description": "${metaDescription}",








}  )    </div>      </footer>        </div>          </div>            &copy; 2025 Théo Gédin. All rights reserved.                "image": "${siteUrl}${metaImage}",
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
        }
      </Head>
      
      <AnimatedBackground />
      
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
            <a href="https://x.com/TheoGedin" className="footer-link" target="_blank" rel="noopener noreferrer">
              Follow on X
            </a>
          </div>
          <div className="copyright">
            &copy; 2025 Théo Gédin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
