import React, { useRef } from "react";
import MainLayout from "./MainLayout";
import PostHeader from "../components/post/Header";
import PostBody from "../components/post/Body";
import PostContainer from "../components/post/Container";
import ReadingProgress from "../components/ReadingProgress";

export default function BlogPostLayout({ post, components }) {
  const contentRef = useRef(null);

  console.log("BlogPostLayout received:", {
    hasPost: !!post,
    postId: post?.id,
    hasFrontMatter: !!post?.frontMatter,
    hasMdxSource: !!post?.mdxSource,
  });

  // Safe guard against missing data
  if (!post) {
    return (
      <MainLayout title="Error" description="Error loading blog post">
        <div className="error-container">
          <h1>Error Loading Post</h1>
          <p>Could not load post data. Please try again later.</p>
        </div>
      </MainLayout>
    );
  }

  // Handle case when frontMatter is missing
  if (!post.frontMatter) {
    return (
      <MainLayout title="Error" description="Error with post metadata">
        <div className="error-container">
          <h1>Error Loading Post</h1>
          <p>Post metadata could not be loaded.</p>
          <div className="debug-info">
            <h2>Debug Information</h2>
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={post.frontMatter.title || "Blog Post"}
      description={post.frontMatter.description || ""}
    >
      <ReadingProgress target={contentRef} />
      <PostContainer>
        <div ref={contentRef} className="blog-post">
          <PostHeader
            title={post.frontMatter.title}
            date={post.frontMatter.date}
            tags={post.frontMatter.tags}
            readingTime={post.frontMatter.readingTime}
          />
          <PostBody content={post.mdxSource} components={components} />
        </div>
      </PostContainer>

      <style jsx>{`
        .error-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1rem;
        }

        .debug-info {
          margin-top: 2rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: auto;
        }

        .blog-post {
          width: 100%;
        }
      `}</style>
    </MainLayout>
  );
}
