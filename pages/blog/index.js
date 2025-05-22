import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";

export default function Blog() {
  return (
    <MainLayout
      title="Articles"
      description="Read my articles on Substack - From urban planning to data science"
    >
      <div className="blog-container">
        <h1>Articles</h1>

        <p className="blog-intro">
          All my articles have moved to Substack. Please follow me there for
          insights on the intersection of technology and humanity, from urban
          systems to artificial intelligence.
        </p>

        <div className="substack-container">
          <div className="substack-content">
            <h2>Follow my writing on Substack</h2>
            <p>
              I publish regular articles about data science, urban planning, and
              the future of technology. Subscribe to get the latest directly in
              your inbox.
            </p>
            <a
              href="https://theogedin.substack.com/"
              className="substack-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit My Substack →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-container {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        h1 {
          font-size: 2.25rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--color-border);
          text-align: left;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .blog-intro {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--color-secondary);
          margin-bottom: 2.5rem;
          font-weight: 400;
          max-width: 85%;
          opacity: 0.9;
        }

        .substack-container {
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: var(--shadow-md);
        }

        .substack-container h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .substack-button {
          display: inline-block;
          background-color: var(--color-primary);
          color: white;
          padding: 0.8rem 1.6rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 1.1rem;
          margin-top: 1.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .substack-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .blog-container {
            padding: 2rem 1rem;
          }

          h1 {
            font-size: 1.85rem;
          }

          .blog-intro {
            font-size: 1.05rem;
            max-width: 100%;
          }

          .substack-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
