import React, { useRef } from "react";
import MainLayout from "./MainLayout";
import PostHeader from "../components/post/Header";
import PostBody from "../components/post/Body";
import PostContainer from "../components/post/Container";
import ReadingProgress from "../components/ReadingProgress";
import { marked } from "marked";
import ArticleStyles from "../components/post/ArticleStyles";

export default function BlogPostLayout({ post, components }) {
  const contentRef = useRef(null);

  // Simple fallback for missing data
  const title = post?.frontMatter?.title || "Blog Post";
  const description = post?.frontMatter?.description || "";
  const date = post?.frontMatter?.date || null;
  const tags = post?.frontMatter?.tags || [];
  const readingTime = post?.frontMatter?.readingTime || null;

  return (
    <MainLayout title={title} description={description}>
      <ReadingProgress target={contentRef} />
      <PostContainer>
        <div ref={contentRef} className="blog-post">
          <PostHeader
            title={title}
            date={date}
            tags={tags}
            readingTime={readingTime}
          />
          {post?.mdxSource ? (
            <PostBody content={post.mdxSource} components={components} />
          ) : post?.rawContent ? (
            <ArticleStyles slug={post.slug}>
              <div className="markdown-fallback">
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(post.rawContent),
                  }}
                />
              </div>
            </ArticleStyles>
          ) : (
            <div className="error-message">Content unavailable</div>
          )}
          <div className="browse-all-link">
            <a href="/blog" className="view-all-link">
              Browse all articles &rarr;
            </a>
          </div>
        </div>
      </PostContainer>
      <style jsx>{`
        .error-message {
          padding: 1rem;
          background-color: #fff5f5;
          border-left: 4px solid #f56565;
          margin: 1rem 0;
        }
        .markdown-fallback {
          margin-top: 1.5rem;
        }
        .fallback-warning {
          color: #bfa700;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          text-align: center;
          opacity: 0.7;
        }
        .blog-post {
          width: 100%;
        }
        .browse-all-link {
          margin-top: 2.5rem;
          text-align: center;
        }
        .view-all-link {
          color: var(--color-primary);
          font-weight: 500;
          text-decoration: none;
          font-size: 1.05rem;
        }
        .view-all-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </MainLayout>
  );
}
