import React, { useRef } from "react";
import MainLayout from "./MainLayout";
import PostHeader from "../components/post/Header";
import PostBody from "../components/post/Body";
import PostContainer from "../components/post/Container";
import ReadingProgress from "../components/ReadingProgress";

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
          ) : (
            <div className="error-message">Content unavailable</div>
          )}
        </div>
      </PostContainer>

      <style jsx>{`
        .error-message {
          padding: 1rem;
          background-color: #fff5f5;
          border-left: 4px solid #f56565;
          margin: 1rem 0;
        }

        .blog-post {
          width: 100%;
        }
      `}</style>
    </MainLayout>
  );
}
