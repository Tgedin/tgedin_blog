import Head from 'next/head';
import Header from '../components/Header';

export default function MainLayout({ children, title, description }) {
  const siteTitle = title ? `${title} | From Bricks to Bytes` : 'From Bricks to Bytes';
  const metaDescription = description || 'Personal blog and project showcase';
  
  return (
    <div className="layout">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
      </Head>
      
      {/* Skip to content link removed as requested */}
      
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
