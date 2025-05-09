import { useRef } from "react";
import Link from "next/link";
import MainLayout from "./MainLayout";
import PostHeader from "../components/post/Header";
import PostBody from "../components/post/Body";
import ReadingProgress from "../components/ReadingProgress";
import ArticleStyles from "../components/ArticleStyles";
import MDXHydrationFix from "../components/MDXHydrationFix";

export default function BlogPostLayout({
  title,
  description,
  date,
  tags,
  image,
  children,
}) {
  const contentRef = useRef(null);

  return (
    <MainLayout title={title} description={description}>
      <ReadingProgress target={contentRef} />
      <div className="blog-post-container">
        <div ref={contentRef} className="blog-post">
          <PostHeader title={title} date={date || null} tags={tags || []} />
          <MDXHydrationFix>
            <ArticleStyles>
              <div className="mdx-content">{children}</div>
            </ArticleStyles>
          </MDXHydrationFix>

          {/* Add blog navigation section */}
          <div className="blog-navigation">
            <Link href="/blog" className="browse-all-link">
              ← Browse all articles
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .blog-post-container {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .blog-post {
          width: 100%;
          position: relative;
        }

        .mdx-content {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .blog-navigation {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
        }

        .browse-all-link {
          color: var(--color-primary);
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: transform 0.2s ease;
        }

        .browse-all-link:hover {
          transform: translateX(-4px);
        }
      `}</style>
    </MainLayout>
  );
}
