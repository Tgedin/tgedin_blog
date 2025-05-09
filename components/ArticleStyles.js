import React from "react";

export default function ArticleStyles({ children, slug }) {
  return (
    <div className={`article-content ${slug ? `article-${slug}` : ""}`}>
      {children}
      <style jsx global>{`
        .article-content {
          width: 100%;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          line-height: 1.25;
        }

        .article-content h1 {
          font-size: 2.25rem;
        }

        .article-content h2 {
          font-size: 1.8rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid var(--color-border);
          margin-top: 2.5rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
        }

        .article-content h4 {
          font-size: 1.25rem;
        }

        .article-content p,
        .article-content ul,
        .article-content ol,
        .article-content blockquote {
          margin-bottom: 1.5rem;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2rem 0;
        }

        .article-content a {
          color: var(--color-primary);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
        }

        .article-content a:hover {
          border-color: var(--color-primary);
        }

        .article-content ul,
        .article-content ol {
          padding-left: 2rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content blockquote {
          border-left: 4px solid var(--color-primary);
          padding-left: 1rem;
          font-style: italic;
          color: var(--color-text-secondary);
        }

        .article-content pre {
          background-color: var(--color-bg-secondary);
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        .article-content code {
          background-color: var(--color-bg-secondary);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-size: 0.9em;
        }

        .article-content pre code {
          background-color: transparent;
          padding: 0;
        }

        .article-content hr {
          border: 0;
          height: 1px;
          background-color: var(--color-border);
          margin: 2rem 0;
        }

        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }

        .article-content th,
        .article-content td {
          padding: 0.5rem;
          border: 1px solid var(--color-border);
        }

        .article-content th {
          background-color: var(--color-bg-secondary);
        }
      `}</style>
    </div>
  );
}
