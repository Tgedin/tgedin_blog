import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

export default function Custom404() {
  return (
    <MainLayout
      title="Page Not Found | From Bricks to Bytes"
      description="Sorry, the page you're looking for cannot be found."
    >
      <div className="error-container">
        <h1>404 - Page Not Found</h1>
        <p>
          You&apos;ve reached a page that doesn&apos;t exist or has been moved.
        </p>

        <div className="error-actions">
          <Link href="/" className="home-button">
            Return to Home
          </Link>
          <Link href="/blog" className="blog-button">
            Browse Articles
          </Link>
        </div>
      </div>

      <style jsx>{`
        .error-container {
          max-width: var(--content-width);
          margin: 4rem auto;
          text-align: center;
          padding: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: var(--color-text-secondary);
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .home-button,
        .blog-button {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .home-button {
          background-color: var(--color-primary);
          color: white;
        }

        .blog-button {
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }

        .home-button:hover,
        .blog-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </MainLayout>
  );
}
